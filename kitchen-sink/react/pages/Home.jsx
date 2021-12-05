import React, { useLayoutEffect, useState } from 'react';
import {
  Page,
  Navbar,
  BlockTitle,
  List,
  ListItem,
  Radio,
  Toggle,
} from 'tailwind-mobile/react';
import { Link } from 'react-router-dom';
import routes from '../routes.js';
import GrassIcon from '../components/GrassIcon';

export default function HomePage({ theme, setTheme }) {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle('dark');
  };

  useLayoutEffect(() => {
    setDarkMode(document.documentElement.classList.contains('dark'));
  });

  return (
    <Page>
      <Navbar
        title="Touch-Mobile"
        subtitle="RSTM"
        className="top-0 sticky"
        right={<Link navbar>Sign-Up</Link>}
      />
      <BlockTitle>Theme</BlockTitle>
      <List>
        <ListItem
          label
          title="iOS Theme"
          media={
            <Radio
              onChange={() => setTheme('ios')}
              component="div"
              checked={theme === 'ios'}
            />
          }
        />
        <ListItem
          label
          title="Material Theme"
          media={
            <Radio
              onChange={() => setTheme('material')}
              component="div"
              checked={theme === 'material'}
            />
          }
        />
      </List>

      <List>
        <ListItem
          title="Dark Mode"
          after={
            <Toggle onChange={() => toggleDarkMode()} checked={darkMode} />
          }
        />
      </List>

      <BlockTitle>Components</BlockTitle>
      <List>
        {routes.map((route) => (
          <ListItem
            key={route.path}
            link
            title={route.title}
            linkComponent={Link}
            linkProps={{ to: route.path }}
            media={<GrassIcon />}
          />
        ))}
        </List>
    </Page>
  );
}
HomePage.displayName = 'HomePage';
