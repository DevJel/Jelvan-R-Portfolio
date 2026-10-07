import React, { createContext, useContext, useMemo, useState } from 'react';
import {
  ArticleSortingOption,
  ArticlesReducerState,
  IDevToArticle,
} from '../types/redux/articles-reducer-types';
import { ContactFormData, ContactState } from '../types/redux/contact-reducer-types';

const INITIAL_ARTICLES: IDevToArticle[] = [
  {
    id: 1,
    title: 'Building a Windows 11 Web OS Portfolio with Next.js & TypeScript',
    description:
      'A deep dive into architecting a multi-window desktop environment in the browser using React, Styled-Components, and custom state management.',
    published_at: '2026-02-15T10:00:00Z',
    slug: 'building-windows-11-web-os-portfolio',
    url: 'https://dev.to/',
    comments_count: 24,
    public_reactions_count: 142,
    positive_reactions_count: 142,
    page_views_count: 4820,
    cover_image: '/assets/portfolio/projectOne/SneakerManiacs.png',
    tag_list: ['react', 'typescript', 'nextjs', 'webdev'],
  },
  {
    id: 2,
    title: 'Enterprise CPQ Architecture & Real-Time Configuration Systems',
    description:
      'How to design high-throughput configuration and quoting engines that scale across complex enterprise rules and dynamic UI layouts.',
    published_at: '2026-01-10T10:00:00Z',
    slug: 'enterprise-cpq-architecture',
    url: 'https://dev.to/',
    comments_count: 18,
    public_reactions_count: 98,
    positive_reactions_count: 98,
    page_views_count: 3150,
    cover_image: '/assets/portfolio/orcl/orcl.png',
    tag_list: ['typescript', 'javascript', 'react', 'webdev'],
  },
  {
    id: 3,
    title: 'Modern Full-Stack E-Commerce Patterns with Next.js',
    description:
      'Exploring static and dynamic page pre-generation, state persistence, and responsive native-like web experiences.',
    published_at: '2025-11-20T10:00:00Z',
    slug: 'modern-fullstack-ecommerce-patterns',
    url: 'https://dev.to/',
    comments_count: 15,
    public_reactions_count: 86,
    positive_reactions_count: 86,
    page_views_count: 2740,
    cover_image: '/assets/portfolio/projectTwo/vpsFullHd.png',
    tag_list: ['nextjs', 'react', 'javascript', 'beginners'],
  },
];

export interface LocalRootState {
  ui: {
    theme: 'dark' | 'light';
  };
  contact: ContactState;
  articles: ArticlesReducerState;
}

export interface PortfolioActions {
  sendEmailViaSendgrid: (data: ContactFormData) => void;
  addFilterOption: (filterOption: string) => void;
  removeFilterOption: (filterOption: string) => void;
  applySortingOption: (sortingOption: ArticleSortingOption) => void;
}

interface PortfolioContextValue {
  state: LocalRootState;
  actions: PortfolioActions;
}

const defaultState: LocalRootState = {
  ui: { theme: 'dark' },
  contact: {
    isEmailSending: false,
    isEmailSent: false,
    error: null,
  },
  articles: {
    articles: INITIAL_ARTICLES,
    areArticlesLoading: false,
    filterOptions: [],
    sortArticlesBy: 'likes',
    error: null,
  },
};

const PortfolioStateContext = createContext<PortfolioContextValue>({
  state: defaultState,
  actions: {
    sendEmailViaSendgrid: () => {},
    addFilterOption: () => {},
    removeFilterOption: () => {},
    applySortingOption: () => {},
  },
});

export const PortfolioStateProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [contact, setContact] = useState<ContactState>(defaultState.contact);
  const [filterOptions, setFilterOptions] = useState<string[]>([]);
  const [sortArticlesBy, setSortArticlesBy] =
    useState<ArticleSortingOption>('likes');

  const filteredAndSortedArticles = useMemo(() => {
    let list = [...INITIAL_ARTICLES];
    if (filterOptions.length > 0) {
      list = list.filter((article) =>
        filterOptions.some((tag) => article.tag_list.includes(tag))
      );
    }
    list.sort((a, b) => {
      if (sortArticlesBy === 'likes') {
        return b.public_reactions_count - a.public_reactions_count;
      }
      if (sortArticlesBy === 'views') {
        return b.page_views_count - a.page_views_count;
      }
      return (
        new Date(b.published_at).getTime() - new Date(a.published_at).getTime()
      );
    });
    return list;
  }, [filterOptions, sortArticlesBy]);

  const actions = useMemo<PortfolioActions>(
    () => ({
      sendEmailViaSendgrid: () => {
        setContact({ isEmailSending: true, isEmailSent: false, error: null });
        setTimeout(() => {
          setContact({ isEmailSending: false, isEmailSent: true, error: null });
        }, 500);
      },
      addFilterOption: (tag: string) => {
        setFilterOptions((prev) =>
          prev.includes(tag) ? prev : [...prev, tag]
        );
      },
      removeFilterOption: (tag: string) => {
        setFilterOptions((prev) => prev.filter((item) => item !== tag));
      },
      applySortingOption: (sortingOption: ArticleSortingOption) => {
        setSortArticlesBy(sortingOption);
      },
    }),
    []
  );

  const state = useMemo<LocalRootState>(
    () => ({
      ui: { theme: 'dark' },
      contact,
      articles: {
        articles: filteredAndSortedArticles,
        areArticlesLoading: false,
        filterOptions,
        sortArticlesBy,
        error: null,
      },
    }),
    [contact, filteredAndSortedArticles, filterOptions, sortArticlesBy]
  );

  return (
    <PortfolioStateContext.Provider value={{ state, actions }}>
      {children}
    </PortfolioStateContext.Provider>
  );
};

export const usePortfolioContext = () => useContext(PortfolioStateContext);
