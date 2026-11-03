import React, { useState } from 'react';
import * as Styled from './SkillIcon.styles';
import Image from 'next/legacy/image';

export interface Props {
  iconSrc: string;
  text: string;
  iconSize: { height: number; width: number };
}

/** Official learning references for technology logos shown in the About skills cards. */
const SKILL_REFERENCES: Record<string, string> = {
  JavaScript: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript',
  TypeScript: 'https://www.typescriptlang.org/docs/',
  React: 'https://react.dev/learn',
  HTML: 'https://developer.mozilla.org/en-US/docs/Web/HTML',
  CSS: 'https://developer.mozilla.org/en-US/docs/Web/CSS',
  'Next.js': 'https://nextjs.org/docs',
  Jest: 'https://jestjs.io/docs/getting-started',
  NodeJS: 'https://nodejs.org/en/learn',
  'Node.js': 'https://nodejs.org/en/learn',
  Python: 'https://docs.python.org/3/',
  Express: 'https://expressjs.com/en/starter/installing.html',
  GraphQL: 'https://graphql.org/learn/',
  Mongo: 'https://www.mongodb.com/docs/',
  MongoDB: 'https://www.mongodb.com/docs/',
  MySQL: 'https://dev.mysql.com/doc/',
  Postgresql: 'https://www.postgresql.org/docs/',
  PostgreSQL: 'https://www.postgresql.org/docs/',
  Cloudflare: 'https://developers.cloudflare.com/',
};

/** A logo links to official platform documentation whenever a reference is available. */
const Component = ({ iconSrc, text, iconSize }: Props): JSX.Element => {
  const [isHovering, setIsHovering] = useState(false);
  const referenceUrl = SKILL_REFERENCES[text];

  const skillImage = (
    <Image
      src={iconSrc}
      height={iconSize.height}
      width={iconSize.width}
      alt={`Official ${text} logo`}
      objectFit={'contain'}
      className={'icon-img'}
    />
  );

  return (
    <Styled.Container
      isHovering={isHovering}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {referenceUrl ? (
        <Styled.IconLink
          href={referenceUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Open official ${text} documentation in a new tab`}
          title={`Official ${text} documentation`}
        >
          {skillImage}
        </Styled.IconLink>
      ) : (
        skillImage
      )}
      <Styled.SkillText>
        <Styled.IconText isHovering={isHovering}>
          {referenceUrl ? (
            <Styled.ReferenceTextLink
              href={referenceUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Learn how ${text} works (official documentation)`}
            >
              {text} · Official docs ↗
            </Styled.ReferenceTextLink>
          ) : (
            text
          )}
        </Styled.IconText>
      </Styled.SkillText>
    </Styled.Container>
  );
};

export default Component;
