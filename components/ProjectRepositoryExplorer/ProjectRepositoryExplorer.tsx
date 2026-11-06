import React, { useEffect, useMemo, useState } from 'react';
import {
  FiChevronDown,
  FiChevronRight,
  FiCopy,
  FiExternalLink,
  FiFileText,
  FiFolder,
  FiGithub,
  FiSearch
} from 'react-icons/fi';
import type { ProjectRepository, RepositoryTreeEntry } from './projectRepositoryData';

type FileNode = RepositoryTreeEntry & {
  name: string;
  children: FileNode[];
};

const buildNodes = (entries: RepositoryTreeEntry[]): FileNode[] => {
  const nodes = new Map<string, FileNode>();
  entries.forEach((entry) => {
    const name = entry.path.split('/').pop() || entry.path;
    nodes.set(entry.path, { ...entry, name, children: [] });
  });

  const roots: FileNode[] = [];
  nodes.forEach((node) => {
    const separator = node.path.lastIndexOf('/');
    const parentPath = separator >= 0 ? node.path.slice(0, separator) : '';
    const parent = parentPath ? nodes.get(parentPath) : undefined;
    if (parent) parent.children.push(node);
    else roots.push(node);
  });

  const sort = (items: FileNode[]) => {
    items.sort((a, b) => {
      if (a.type !== b.type) return a.type === 'tree' ? -1 : 1;
      return a.name.localeCompare(b.name);
    });
    items.forEach((item) => sort(item.children));
  };
  sort(roots);
  return roots;
};

const filterNodes = (nodes: FileNode[], query: string): FileNode[] => {
  if (!query) return nodes;
  return nodes.reduce<FileNode[]>((result, node) => {
    if (node.type === 'tree') {
      const children = filterNodes(node.children, query);
      if (node.name.toLowerCase().includes(query) || children.length > 0) {
        result.push({ ...node, children });
      }
      return result;
    }
    if (node.name.toLowerCase().includes(query) || node.path.toLowerCase().includes(query)) {
      result.push(node);
    }
    return result;
  }, []);
};

const findDefaultFile = (repository: ProjectRepository): string => {
  const files = repository.tree.filter((entry) => entry.type === 'blob');
  const isPreviewable = (path: string) => repository.visibility !== 'public' || repository.previewPaths?.includes(path);
  const readme = files.find((entry) => entry.path.toLowerCase() === 'readme.md' && isPreviewable(entry.path));
  if (readme) return readme.path;
  const firstPreviewable = files.find((entry) => isPreviewable(entry.path));
  return firstPreviewable?.path ?? files[0]?.path ?? '';
};

const isTextFile = (path: string): boolean => {
  const extension = path.split('.').pop()?.toLowerCase() ?? '';
  return [
    'c', 'css', 'csv', 'dart', 'go', 'gradle', 'html', 'java', 'js', 'json',
    'jsonc', 'jsx', 'md', 'mdx', 'mjs', 'mmd', 'py', 'rs', 'sh', 'sql',
    'svg', 'toml', 'ts', 'tsx', 'txt', 'xml', 'yaml', 'yml'
  ].includes(extension);
};

const languageForPath = (path: string): string => {
  const extension = path.split('.').pop()?.toLowerCase() ?? '';
  const labels: Record<string, string> = {
    css: 'CSS', dart: 'Dart', gradle: 'Gradle', html: 'HTML', js: 'JavaScript',
    json: 'JSON', jsonc: 'JSONC', jsx: 'React JSX', md: 'Markdown', mdx: 'MDX',
    mjs: 'JavaScript', mmd: 'Mermaid', py: 'Python', sh: 'Shell', sql: 'SQL',
    svg: 'SVG', toml: 'TOML', ts: 'TypeScript', tsx: 'TypeScript JSX',
    txt: 'Text', xml: 'XML', yaml: 'YAML', yml: 'YAML'
  };
  return labels[extension] ?? 'Text';
};

const rawFileUrl = (repository: ProjectRepository, path: string): string => {
  const encodedPath = path.split('/').map((segment) => encodeURIComponent(segment)).join('/');
  return 'https://raw.githubusercontent.com/' + repository.fullName + '/' + repository.branch + '/' + encodedPath;
};

const githubFileUrl = (repository: ProjectRepository, path: string): string | undefined => {
  if (!repository.repoUrl) return undefined;
  const encodedPath = path.split('/').map((segment) => encodeURIComponent(segment)).join('/');
  return repository.repoUrl + '/blob/' + repository.branch + '/' + encodedPath;
};

const visibilityLabel = (visibility: ProjectRepository['visibility']): string => {
  if (visibility === 'private') return 'Private GitHub source';
  if (visibility === 'public') return 'Public GitHub source';
  return 'Reference blueprint';
};

export interface ProjectRepositoryExplorerProps {
  repositories: ProjectRepository[];
  projectTitle: string;
}

const ProjectRepositoryExplorer = ({
  repositories,
  projectTitle
}: ProjectRepositoryExplorerProps): JSX.Element | null => {
  const [activeRepoId, setActiveRepoId] = useState(repositories[0]?.id ?? '');
  const activeRepository = useMemo(
    () => repositories.find((repository) => repository.id === activeRepoId) ?? repositories[0],
    [activeRepoId, repositories]
  );
  const tree = useMemo(
    () => buildNodes(activeRepository?.tree ?? []),
    [activeRepository]
  );
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});
  const [search, setSearch] = useState('');
  const [selectedFilePath, setSelectedFilePath] = useState('');
  const [fileContent, setFileContent] = useState<string | null>(null);
  const [fileStatus, setFileStatus] = useState('Choose a file from the repository tree.');
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const visibleTree = useMemo(
    () => filterNodes(tree, search.trim().toLowerCase()),
    [tree, search]
  );
  const selectedGithubUrl = activeRepository && selectedFilePath
    ? githubFileUrl(activeRepository, selectedFilePath)
    : undefined;

  useEffect(() => {
    if (!activeRepository) return;
    setSelectedFilePath(findDefaultFile(activeRepository));
    setSearch('');
    setExpanded(
      Object.fromEntries(
        activeRepository.tree
          .filter((entry) => entry.type === 'tree' && !entry.path.includes('/'))
          .map((entry) => [entry.path, ['docs', 'public', 'src', 'frontend', 'outreach'].includes(entry.path)])
      )
    );
  }, [activeRepoId, activeRepository]);

  useEffect(() => {
    setIsLoading(false);
    if (!activeRepository || !selectedFilePath) {
      setFileContent(null);
      setFileStatus('Choose a file from the repository tree.');
      return;
    }

    const entry = activeRepository.tree.find(
      (item) => item.path === selectedFilePath && item.type === 'blob'
    );
    if (!entry) {
      setFileContent(null);
      setFileStatus('Select a file to inspect its preview.');
      return;
    }
    if (!isTextFile(selectedFilePath)) {
      setFileContent(null);
      setFileStatus('This is a binary asset. Open it on GitHub to inspect or download the original.');
      return;
    }
    if (entry.size && entry.size > 180000) {
      setFileContent(null);
      setFileStatus('This file is larger than the inline preview limit. Open it on GitHub to inspect the full file.');
      return;
    }

    const showcaseContent = activeRepository.showcaseFiles?.[selectedFilePath];
    if (typeof showcaseContent === 'string') {
      setFileContent(showcaseContent);
      setFileStatus(
        activeRepository.visibility === 'concept'
          ? 'Reference blueprint sample · not an existing implementation file'
          : 'Sanitized showcase sample · not the private production source'
      );
      return;
    }

    if (activeRepository.visibility !== 'public') {
      setFileContent(null);
      setFileStatus(
        activeRepository.visibility === 'private'
          ? 'The original file belongs to a private repository and is not copied into this public portfolio. Open the private GitHub repository if your account has access.'
          : 'This is a blueprint folder. No implementation file has been published for this path.'
      );
      return;
    }

    if (!activeRepository.previewPaths?.includes(selectedFilePath)) {
      setFileContent(null);
      setFileStatus('This path is shown in the public repository tree, but inline preview is not enabled for it. Open GitHub to inspect the original file.');
      return;
    }

    const controller = new AbortController();
    setIsLoading(true);
    setFileContent(null);
    setFileStatus('Loading public source file…');

    fetch(rawFileUrl(activeRepository, selectedFilePath), { signal: controller.signal })
      .then((response) => {
        if (!response.ok) throw new Error('GitHub file request failed (' + response.status + ').');
        return response.text();
      })
      .then((content) => {
        if (controller.signal.aborted) return;
        if (content.length > 180000) {
          setFileContent(null);
          setFileStatus('This file is larger than the inline preview limit. Open GitHub to inspect the full file.');
          return;
        }
        setFileContent(content);
        setFileStatus('Public GitHub source preview');
      })
      .catch((error: unknown) => {
        if (controller.signal.aborted) return;
        setFileContent(null);
        setFileStatus(error instanceof Error ? error.message : 'Unable to load this file. Open GitHub to inspect it.');
      })
      .finally(() => {
        if (!controller.signal.aborted) setIsLoading(false);
      });

    return () => controller.abort();
  }, [activeRepository, selectedFilePath]);

  if (!repositories.length) return null;

  const renderNodes = (nodes: FileNode[], depth = 0): React.ReactNode =>
    nodes.map((node) => {
      if (node.type === 'tree') {
        const isExpanded = expanded[node.path] ?? false;
        return (
          <div className="repo-explorer__tree-node" key={node.path}>
            <button
              type="button"
              className="repo-explorer__tree-row repo-explorer__tree-row--folder"
              style={{ paddingLeft: 12 + depth * 15 }}
              aria-expanded={isExpanded}
              onClick={() => setExpanded((current) => ({ ...current, [node.path]: !isExpanded }))}
            >
              {isExpanded ? <FiChevronDown aria-hidden="true" /> : <FiChevronRight aria-hidden="true" />}
              <FiFolder aria-hidden="true" />
              <span>{node.name}</span>
            </button>
            {isExpanded && node.children.length > 0 && (
              <div className="repo-explorer__tree-children">{renderNodes(node.children, depth + 1)}</div>
            )}
          </div>
        );
      }

      return (
        <button
          type="button"
          key={node.path}
          className={
            'repo-explorer__tree-row repo-explorer__tree-row--file' +
            (selectedFilePath === node.path ? ' is-selected' : '')
          }
          style={{ paddingLeft: 35 + depth * 15 }}
          onClick={() => setSelectedFilePath(node.path)}
          aria-current={selectedFilePath === node.path ? 'true' : undefined}
        >
          <FiFileText aria-hidden="true" />
          <span>{node.name}</span>
          {node.size ? <small>{Math.max(1, Math.round(node.size / 1024))} KB</small> : null}
        </button>
      );
    });

  const handleCopy = async () => {
    if (fileContent === null) return;
    try {
      await navigator.clipboard.writeText(fileContent);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1400);
    } catch {
      setCopied(false);
    }
  };

  const lines = fileContent === null ? [] : fileContent.split('\n');
  const displayedLines = lines.slice(0, 700);
  const folderCount = activeRepository?.tree.filter((entry) => entry.type === 'tree').length ?? 0;
  const fileCount = activeRepository?.tree.filter((entry) => entry.type === 'blob').length ?? 0;

  return (
    <section className="repo-explorer" aria-labelledby="repo-explorer-title">
      <div className="repo-explorer__heading">
        <div>
          <span className="project-detail-eyebrow">SOURCE EXPLORER</span>
          <h2 id="repo-explorer-title">Repository folders & file viewer</h2>
          <p>Explore the project structure and inspect the files available in this portfolio showcase.</p>
        </div>
        <div className="repo-explorer__summary">
          <span>{repositories.length} {repositories.length === 1 ? 'repository' : 'repositories'}</span>
          <span>{folderCount} folders</span>
          <span>{fileCount} files</span>
        </div>
      </div>

      {repositories.length > 1 && (
        <div className="repo-explorer__tabs" role="tablist" aria-label={projectTitle + ' repositories'}>
          {repositories.map((repository) => (
            <button
              key={repository.id}
              type="button"
              role="tab"
              aria-selected={activeRepository?.id === repository.id}
              className={activeRepository?.id === repository.id ? 'is-active' : ''}
              onClick={() => setActiveRepoId(repository.id)}
            >
              {repository.label}
            </button>
          ))}
        </div>
      )}

      {activeRepository && (
        <>
          <div className="repo-explorer__repo-meta">
            <div>
              <strong>{activeRepository.label}</strong>
              <span className={'repo-explorer__visibility repo-explorer__visibility--' + activeRepository.visibility}>
                {visibilityLabel(activeRepository.visibility)}
              </span>
              <span className="repo-explorer__tree-label">{activeRepository.treeLabel}</span>
            </div>
            {activeRepository.repoUrl && (
              <a href={activeRepository.repoUrl} target="_blank" rel="noopener noreferrer">
                <FiGithub aria-hidden="true" /> Open repository <FiExternalLink aria-hidden="true" />
              </a>
            )}
          </div>

          <p className="repo-explorer__note">{activeRepository.note}</p>

          <div className="repo-explorer__layout">
            <aside className="repo-explorer__tree-panel" aria-label="Repository folder tree">
              <div className="repo-explorer__tree-toolbar">
                <span>EXPLORER</span>
                <label>
                  <FiSearch aria-hidden="true" />
                  <input
                    value={search}
                    onChange={(event) => setSearch(event.target.value)}
                    placeholder="Find a file or folder"
                    aria-label="Find a file or folder"
                  />
                </label>
              </div>
              <div className="repo-explorer__tree-list">
                {visibleTree.length > 0
                  ? renderNodes(visibleTree)
                  : <p className="repo-explorer__empty-tree">No matching paths found.</p>}
              </div>
              <div className="repo-explorer__tree-footer">
                <span>{activeRepository.branch === 'reference' ? 'Reference' : activeRepository.branch}</span>
                <span>{fileCount} files</span>
              </div>
            </aside>

            <div className="repo-explorer__viewer">
              <div className="repo-explorer__viewer-toolbar">
                <div className="repo-explorer__file-heading">
                  <span className="repo-explorer__file-path">{selectedFilePath || 'Select a file'}</span>
                  {selectedFilePath && <small>{languageForPath(selectedFilePath)}</small>}
                </div>
                <div className="repo-explorer__file-actions">
                  {fileContent !== null && (
                    <button type="button" onClick={handleCopy} aria-label="Copy file contents">
                      <FiCopy aria-hidden="true" /> {copied ? 'Copied' : 'Copy'}
                    </button>
                  )}
                  {selectedGithubUrl && (
                    <a href={selectedGithubUrl} target="_blank" rel="noopener noreferrer">
                      GitHub <FiExternalLink aria-hidden="true" />
                    </a>
                  )}
                </div>
              </div>

              <div className="repo-explorer__content">
                {isLoading ? (
                  <div className="repo-explorer__empty-state">Loading file preview…</div>
                ) : fileContent !== null ? (
                  <>
                    <div className="repo-explorer__file-status">{fileStatus}</div>
                    <pre className="repo-explorer__code">
                      {displayedLines.map((line, index) => (
                        <span className="repo-explorer__line" key={index}>
                          <span className="repo-explorer__line-number">{index + 1}</span>
                          <code>{line || ' '}</code>
                        </span>
                      ))}
                    </pre>
                    {lines.length > displayedLines.length && (
                      <p className="repo-explorer__truncated">Preview limited to the first 700 lines. Open the file on GitHub for the complete source.</p>
                    )}
                  </>
                ) : (
                  <div className="repo-explorer__empty-state">
                    <FiFileText aria-hidden="true" />
                    <p>{fileStatus}</p>
                    {selectedGithubUrl && (
                      <a href={selectedGithubUrl} target="_blank" rel="noopener noreferrer">
                        Open selected file on GitHub <FiExternalLink aria-hidden="true" />
                      </a>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </section>
  );
};

export default ProjectRepositoryExplorer;
