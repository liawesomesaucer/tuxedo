/* global chrome */

import React, { useEffect, useState } from 'react';
import { useBlockHosts } from './hooks/useBlockHosts';

// Next: support default lists, support adding dynamic site blocker. Eventually
// support pagination?
// Also support sorting

export function Tuxedo() {
  const { blockedHosts, blockHost, unblockHost } = useBlockHosts();

  return (
    <div>
      {blockedHosts ? (
        <ul className="tuxedo__blocked-site-list">
          {Object.entries(blockedHosts).map(
            ([host, val]) =>
              val && (
                <ListItemBlockedSite
                  host={host}
                  unblock={() => unblockHost(host)}
                />
              )
          )}
        </ul>
      ) : (
        <p>No hosts blocked</p>
      )}

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
      <label>
        <div>Add site</div>
        <input value={val} onChange={(e) => setVal(e.target.value)} />
      </label>
      <button type="submit" onClick={() => blockHost(val)}>
        Block!
      </button>
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
              target.onError = null;
              setHasImgLoadErr(true);
            }}
            alt={`${host} icon`}
          />
        )}
        <span>{host}</span>
      </span>
      <button onClick={unblock}>Remove</button>
    </li>
  );
}

function LetterIcon({ letter }) {
  return (
    <span className="tuxedo__blocked-site-icon tuxedo__blocked-site-icon-letter">
      {letter}
    </span>
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
