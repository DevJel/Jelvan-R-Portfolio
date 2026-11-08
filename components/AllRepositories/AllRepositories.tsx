import React, { useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import { fallbackRepositories, PortfolioRepo } from './allRepositoriesFallback';

type Filter = 'all' | 'public' | 'private';

const OWNER_LABELS: Record<string, string> = {
  DevJel: 'Personal',
  'Dev-Jel-Works': 'Dev Jel Works',
  'Operava-Global': 'Operava Global',
};

const formatName = (name: string): string =>
  name.replace(/[-_]+$/g, '').replace(/[-_]+/g, ' ');

const formatDate = (value?: string): string | undefined => {
  if (!value) return undefined;
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return undefined;
  return date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
};

const isPortfolioRepo = (value: unknown): value is PortfolioRepo => {
  if (!value || typeof value !== 'object') return false;
  const repo = value as Record<string, unknown>;
  return (
    typeof repo.name === 'string' &&
    typeof repo.owner === 'string' &&
    (repo.visibility === 'public' || repo.visibility === 'private')
  );
};

/** Strip anything a private entry should never carry, whatever the API sent. */
const sanitize = (repo: PortfolioRepo): PortfolioRepo =>
  repo.visibility === 'private'
    ? { name: repo.name, owner: repo.owner, visibility: 'private', description: repo.description ?? '' }
    : {
        ...repo,
        description: repo.description ?? '',
        url: repo.url?.startsWith('https://github.com/') ? repo.url : undefined,
        homepage: repo.homepage?.startsWith('https://') ? repo.homepage : undefined,
      };

const AllRepositories: React.FC = () => {
  const [repos, setRepos] = useState<PortfolioRepo[]>(fallbackRepositories);
  const [isLive, setIsLive] = useState(false);
  const [filter, setFilter] = useState<Filter>('all');
  const [owner, setOwner] = useState<string>('all');
  const [query, setQuery] = useState('');

  useEffect(() => {
    const controller = new AbortController();
    fetch('/api/repos', { signal: controller.signal, headers: { accept: 'application/json' } })
      .then((response) => (response.ok ? response.json() : null))
      .then((data: unknown) => {
        if (!data || typeof data !== 'object') return;
        const list = (data as { repos?: unknown }).repos;
        if (!Array.isArray(list)) return;
        const live = list.filter(isPortfolioRepo).map(sanitize);
        if (live.length === 0) return;
        // If the Worker has no GitHub token it returns public repos only;
        // keep the private names from the built-in list in that case.
        const includesPrivate = (data as { includesPrivate?: unknown }).includesPrivate === true;
        const merged = includesPrivate
          ? live
          : [...live, ...fallbackRepositories.filter((repo) => repo.visibility === 'private')];
        setRepos(merged);
        setIsLive(true);
      })
      .catch(() => undefined);
    return () => controller.abort();
  }, []);

  const owners = useMemo(() => Array.from(new Set(repos.map((repo) => repo.owner))), [repos]);
  const counts = useMemo(
    () => ({
      all: repos.length,
      public: repos.filter((repo) => repo.visibility === 'public').length,
      private: repos.filter((repo) => repo.visibility === 'private').length,
    }),
    [repos]
  );

  const visible = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return repos.filter(
      (repo) =>
        (filter === 'all' || repo.visibility === filter) &&
        (owner === 'all' || repo.owner === owner) &&
        (!needle ||
          repo.name.toLowerCase().includes(needle) ||
          (repo.description ?? '').toLowerCase().includes(needle) ||
          (repo.language ?? '').toLowerCase().includes(needle))
    );
  }, [repos, filter, owner, query]);

  return (
    <Section id="all-repositories" aria-labelledby="all-repositories-title">
      <Container>
        <Header>
          <div>
            <span className="eyebrow">GitHub</span>
            <h2 id="all-repositories-title">All repositories</h2>
            <p>
              Every repository across my personal account and organizations. Public repositories link to their
              source on GitHub. Private repositories are listed by name only; their code stays access-controlled.
            </p>
          </div>
          <Stats aria-live="polite">
            <div><strong>{counts.all}</strong><span>Total</span></div>
            <div><strong>{counts.public}</strong><span>Public</span></div>
            <div><strong>{counts.private}</strong><span>Private</span></div>
          </Stats>
        </Header>

        <Toolbar>
          <Segmented role="group" aria-label="Filter by visibility">
            {(['all', 'public', 'private'] as Filter[]).map((value) => (
              <button
                key={value}
                type="button"
                aria-pressed={filter === value}
                onClick={() => setFilter(value)}
              >
                {value === 'all' ? 'All' : value === 'public' ? 'Public' : 'Private'}
              </button>
            ))}
          </Segmented>
          <Select
            aria-label="Filter by account"
            value={owner}
            onChange={(event) => setOwner(event.target.value)}
          >
            <option value="all">All accounts</option>
            {owners.map((value) => (
              <option key={value} value={value}>
                {OWNER_LABELS[value] ?? value}
              </option>
            ))}
          </Select>
          <Search
            type="search"
            placeholder="Search repositories"
            aria-label="Search repositories"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
        </Toolbar>

        {visible.length === 0 ? (
          <Empty>No repositories match that search.</Empty>
        ) : (
          <Grid>
            {visible.map((repo) => {
              const updated = formatDate(repo.updatedAt);
              const isPublic = repo.visibility === 'public';
              return (
                <Card key={`${repo.owner}/${repo.name}`} $private={!isPublic}>
                  <CardTop>
                    <Badge $private={!isPublic}>{isPublic ? 'Public' : 'Private'}</Badge>
                    {repo.fork ? <Badge $muted>Fork</Badge> : null}
                    <OwnerLabel>{OWNER_LABELS[repo.owner] ?? repo.owner}</OwnerLabel>
                  </CardTop>
                  <h3 title={repo.name}>{formatName(repo.name)}</h3>
                  {repo.description ? (
                    <p>{repo.description}</p>
                  ) : (
                    <p className="muted">
                      {isPublic ? 'Source code available on GitHub.' : 'Private project. Source is not public.'}
                    </p>
                  )}
                  <Meta>
                    {repo.language ? <span>{repo.language}</span> : null}
                    {isPublic && typeof repo.stars === 'number' && repo.stars > 0 ? (
                      <span>{repo.stars} {repo.stars === 1 ? 'star' : 'stars'}</span>
                    ) : null}
                    {updated ? <span>Updated {updated}</span> : null}
                  </Meta>
                  {isPublic && repo.url ? (
                    <Links>
                      <a href={repo.url} target="_blank" rel="noopener noreferrer">
                        View on GitHub
                      </a>
                      {repo.homepage ? (
                        <a href={repo.homepage} target="_blank" rel="noopener noreferrer">
                          Live site
                        </a>
                      ) : null}
                    </Links>
                  ) : null}
                </Card>
              );
            })}
          </Grid>
        )}

        <Footnote>
          {isLive ? 'Updated automatically from GitHub.' : 'Showing the saved repository list.'}
        </Footnote>
      </Container>
    </Section>
  );
};

export default AllRepositories;

const Section = styled.section`
  background: #ffffff;
  padding: clamp(4rem, 7vw, 7rem) 0;
  color: #172b4d;
  border-top: 1px solid #f0e5d9;
`;
const Container = styled.div`
  max-width: 1320px;
  padding: 0 clamp(1.1rem, 4.5vw, 4rem);
  margin: auto;
`;
const Header = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 2rem;
  align-items: flex-end;
  margin-bottom: 1.8rem;
  @media (max-width: 820px) { align-items: flex-start; flex-direction: column; gap: 1.2rem; }
  .eyebrow {
    color: #d96514;
    font-size: 0.8rem;
    letter-spacing: 0.19em;
    font-weight: 700;
    text-transform: uppercase;
  }
  h2 { margin: .6rem 0; font-size: clamp(2rem, 4vw, 3.4rem); letter-spacing: -.045em; line-height: 1.16; }
  p { max-width: 660px; color: #5d6574; line-height: 1.65; font-size: .95rem; margin: 0; }
`;
const Stats = styled.div`
  display: flex;
  gap: .6rem;
  flex-shrink: 0;
  div {
    min-width: 84px;
    padding: .8rem 1rem;
    border: 1px solid #f0e5d9;
    border-radius: 16px;
    background: #fffaf4;
    display: flex;
    flex-direction: column;
    gap: .15rem;
  }
  strong { font-size: 1.6rem; letter-spacing: -.03em; font-variant-numeric: tabular-nums; }
  span { font-size: .75rem; color: #5d6574; text-transform: uppercase; letter-spacing: .12em; font-weight: 700; }
`;
const Toolbar = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: .75rem;
  margin-bottom: 1.5rem;
`;
const Segmented = styled.div`
  display: inline-flex;
  padding: 4px;
  border-radius: 999px;
  background: #fff1e3;
  button {
    border: 0;
    background: transparent;
    color: #172b4d;
    font: inherit;
    font-size: .875rem;
    font-weight: 700;
    padding: .55rem 1.1rem;
    border-radius: 999px;
    cursor: pointer;
    min-height: 40px;
  }
  button[aria-pressed='true'] { background: #172b4d; color: #ffffff; }
  button:focus-visible { outline: 3px solid #f48120; outline-offset: 2px; }
`;
const fieldStyles = `
  border: 1px solid rgba(18, 19, 22, 0.16);
  border-radius: 999px;
  background: #ffffff;
  color: #172b4d;
  font: inherit;
  font-size: .9rem;
  padding: .6rem 1rem;
  min-height: 44px;
  &:focus-visible { outline: 3px solid #f48120; outline-offset: 2px; }
`;
const Select = styled.select`
  ${fieldStyles}
`;
const Search = styled.input`
  ${fieldStyles}
  flex: 1 1 220px;
  min-width: 0;
`;
const Grid = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(min(100%, 280px), 1fr));
  gap: 1rem;
`;
const Card = styled.li<{ $private: boolean }>`
  display: flex;
  flex-direction: column;
  gap: .6rem;
  padding: 1.25rem;
  border-radius: 20px;
  border: 1px solid ${({ $private }) => ($private ? 'rgba(18, 19, 22, 0.1)' : '#f2dfcf')};
  background: ${({ $private }) => ($private ? '#fafafa' : '#fffaf4')};
  min-width: 0;
  transition: transform .2s ease, box-shadow .2s ease;
  &:hover { transform: translateY(-2px); box-shadow: 0 14px 34px rgba(96, 54, 17, 0.1); }
  @media (prefers-reduced-motion: reduce) { transition: none; &:hover { transform: none; } }
  h3 {
    margin: 0;
    font-size: 1.1rem;
    letter-spacing: -.02em;
    line-height: 1.3;
    overflow-wrap: anywhere;
  }
  p { margin: 0; font-size: .9rem; line-height: 1.55; color: #3f4756; }
  p.muted { color: #7a8190; }
`;
const CardTop = styled.div`
  display: flex;
  align-items: center;
  gap: .4rem;
  flex-wrap: wrap;
`;
const Badge = styled.span<{ $private?: boolean; $muted?: boolean }>`
  font-size: .7rem;
  font-weight: 700;
  letter-spacing: .08em;
  text-transform: uppercase;
  padding: .25rem .55rem;
  border-radius: 999px;
  background: ${({ $private, $muted }) => ($muted ? '#eef0f3' : $private ? '#172b4d' : '#ffe0bb')};
  color: ${({ $private, $muted }) => ($muted ? '#545c6a' : $private ? '#ffffff' : '#7a2f0a')};
`;
const OwnerLabel = styled.span`
  margin-left: auto;
  font-size: .75rem;
  color: #7a8190;
`;
const Meta = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: .35rem .9rem;
  font-size: .78rem;
  color: #6b7280;
  margin-top: auto;
`;
const Links = styled.div`
  display: flex;
  gap: 1rem;
  a {
    color: #d96514;
    font-weight: 700;
    font-size: .875rem;
    text-decoration: none;
  }
  a:hover, a:focus-visible { text-decoration: underline; }
`;
const Empty = styled.p`
  padding: 2rem;
  text-align: center;
  color: #5d6574;
  border: 1px dashed #f0e5d9;
  border-radius: 20px;
`;
const Footnote = styled.p`
  margin: 1.5rem 0 0;
  font-size: .8rem;
  color: #7a8190;
`;
