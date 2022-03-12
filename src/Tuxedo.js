/* global chrome */

import React, { useEffect, useState } from 'react';
import { useBlockHosts } from './hooks/useBlockHosts';
import {
  CrossButton,
  PlusButton,
  LetterIcon,
  LeftIcon,
  RightIcon,
} from './components/Icons';

// Next: support default lists, support adding dynamic site blocker. Eventually
// Also support sorting
const PAGE_SIZE = 5;

export function Tuxedo() {
  const [page, setPage] = useState(0);
  const { blockedHosts, blockHost, unblockHost } = useBlockHosts();

  const numPages = Math.ceil(Object.entries(blockedHosts).length / 5);

  return (
    <div>
      {blockedHosts ? (
        <div>
          <ul className="tuxedo__blocked-site-list">
            {Object.entries(blockedHosts)
              .slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE)
              .map(
                ([host, val]) =>
                  val && (
                    <ListItemBlockedSite
                      host={host}
                      unblock={() => unblockHost(host)}
                    />
                  )
              )}
          </ul>
          {numPages > 1 && (
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <button
                className={`tuxedo__icon-button ${
                  page === 0 && 'tuxedo__icon-button-disabled'
                }`}
                onClick={() => setPage(page - 1)}
                disabled={page === 0}
                style={{ margin: 2 }}
              >
                <LeftIcon />
              </button>
              {Array.from(Array(numPages)).map((_, i) => {
                return (
                  <button
                    className={`tuxedo__icon-button ${
                      page === i && 'tuxedo__icon-button-active'
                    }`}
                    onClick={() => setPage(i)}
                    style={{ margin: 2 }}
                  >
                    {i}
                  </button>
                );
              })}
              <button
                className={`tuxedo__icon-button ${
                  page >= numPages - 1 && 'tuxedo__icon-button-disabled'
                }`}
                onClick={() => setPage(page + 1)}
                disabled={page >= numPages - 1}
                style={{ margin: 2 }}
              >
                <RightIcon />
              </button>
            </div>
          )}
        </div>
      ) : (
        <p>No hosts blocked</p>
      )}

      <br />

      <BlockSiteInput blockHost={blockHost} />
    </div>
  );
}

function BlockSiteInput({ blockHost }) {
  const [val, setVal] = useState('');

  useEffect(() => {
    chrome.windows.getCurrent(null, (win) => {
      // TODO: this doesn't really do what is expected
    });
  }, []);

  return (
    <div>
      <label htmlFor="tuxedo__site-input">Add site</label>
      <div className="tuxedo__form-input">
        <input
          name="tuxedo__site-input"
          value={val}
          onChange={(e) => setVal(e.target.value)}
        />
        <PlusButton
          type="submit"
          onClick={() => {
            blockHost(val);
            setVal('');
          }}
        />
      </div>
    </div>
  );
}

function ListItemBlockedSite({ host, unblock }) {
  const [hasImgLoadError, setHasImgLoadErr] = useState(false);
  return (
    <li className="tuxedo__blocked-site-list-item">
      <span>
        {hasImgLoadError ? (
          <LetterIcon letter={getDomainFirstLetter(host)} />
        ) : (
          <img
            className="tuxedo__blocked-site-icon"
            src={`https://icons.duckduckgo.com/ip2/${host}.ico`}
            onError={({ target }) => {
              // Fallback to displaying an icon made from first letter of domain
              target.onError = null;
              setHasImgLoadErr(true);
            }}
            alt={`${host} icon`}
          />
        )}
        <span>{host}</span>
      </span>
      <CrossButton onClick={unblock} />
    </li>
  );
}

function getDomain(host) {
  const tmp = host?.split('.');

  if (tmp) {
    return tmp[tmp.length - 2];
  } else {
    return '?';
  }
}

function getDomainFirstLetter(host) {
  return getDomain(host)[0];
}
