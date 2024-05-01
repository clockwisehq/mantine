/* eslint-disable no-console */
import createCache from '@emotion/cache';
import { CacheProvider } from '@emotion/react';
import { createStyles, getStylesRef } from './create-styles';
import { Global } from './Global';
import { MantineEmotionProvider, useEmotionCache } from './MantineEmotionProvider';

export default { title: 'Emotion' };

const testCache = createCache({ key: 'test' });

function CacheConsumer() {
  const cache = useEmotionCache();
  console.log(cache);
  return <div>Cache consumer</div>;
}

export function Usage() {
  return (
    <div style={{ padding: 40 }}>
      <MantineEmotionProvider>
        <CacheConsumer />
      </MantineEmotionProvider>
    </div>
  );
}

export function GlobalStyles() {
  return (
    <CacheProvider value={testCache}>
      <MantineEmotionProvider>
        <Global styles={{ body: { background: 'silver' } }} />
        <Global styles={(theme) => ({ body: { color: theme.colors.red[9] } })} />
        <p>GlobalStyles</p>
      </MantineEmotionProvider>
    </CacheProvider>
  );
}

const useStyles = createStyles((theme) => ({
  root: {
    backgroundColor: theme.colors.blue[9],
    padding: theme.spacing.xl,

    '[data-mantine-color-scheme="dark"] &': {
      [`&:hover .${getStylesRef('inner')}`]: {
        backgroundColor: theme.colors.violet[6],
      },
    },
  },

  inner: {
    backgroundColor: theme.colors.blue[5],
    fontSize: theme.fontSizes.lg,
    color: theme.white,
    ref: getStylesRef('inner'),

    '@media (max-width: 700px)': {
      backgroundColor: theme.colors.red[3],
    },
  },
}));

function CreateStylesConsumer() {
  const { classes } = useStyles();
  return (
    <div className={classes.root}>
      <div className={classes.inner}>CreateStyles</div>
    </div>
  );
}

export function CreateStyles() {
  return (
    <CacheProvider value={testCache}>
      <MantineEmotionProvider>
        <CreateStylesConsumer />
      </MantineEmotionProvider>
    </CacheProvider>
  );
}