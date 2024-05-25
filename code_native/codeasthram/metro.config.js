module.exports = {
  transformer: {
    babelTransformerPath: require.resolve('react-native-svg-transformer'),
  },
  resolver: {
    assetExts: ['db', 'mp3', 'ttf', 'obj', 'png', 'jpg', 'gltf', 'glb'],
    sourceExts: ['jsx', 'js', 'ts', 'tsx', 'json', 'svg'],
  },
};
