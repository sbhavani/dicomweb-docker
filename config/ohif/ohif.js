window.config = {
  routerBasename: '/',
  showStudyList: true,
  extensions: [],
  modes: [],
  showWarningMessageForCrossOrigin: false,
  showCPUFallbackMessage: false,
  showLoadingIndicator: true,
  strictZSpacingForVolumeViewport: true,
  maxNumberOfWebWorkers: 3,
  investigationalUseDialog: {
    option: 'never'
  },
  cornerstoneOptions: {
    useWebWorkers: true,
    maxWebWorkers: 3,
    startWebWorkersOnDemand: true,
    taskConfiguration: {
      decodeTask: {
        initializeCodecsOnStartup: true,
        usePDFJS: false,
        strict: false,
      },
    },
  },
  dataSources: [
    {
      friendlyName: 'Orthanc Server',
      namespace: '@ohif/extension-default.dataSourcesModule.dicomweb',
      sourceName: 'dicomweb',
      configuration: {
        name: 'Orthanc',
        wadoUriRoot: '/wado',
        qidoRoot: '/dicom-web',
        wadoRoot: '/dicom-web',
        qidoSupportsIncludeField: false,
        imageRendering: 'wadors',
        thumbnailRendering: 'wadors',
        enableStudyLazyLoad: true,
        supportsFuzzyMatching: false,
        supportsWildcard: false,
      },
    },
  ],
  defaultDataSourceName: 'dicomweb',
  defaultMouseButtonTools: {
    left: 'Wwwc',
    right: 'Zoom',
    middle: 'Pan',
  },
  hotkeys: [
    {
      commandName: 'incrementActiveViewport',
      label: 'Next Viewport',
      keys: ['right'],
    },
    {
      commandName: 'decrementActiveViewport',
      label: 'Previous Viewport',
      keys: ['left'],
    },
    { commandName: 'rotateViewportCW', label: 'Rotate Right', keys: ['r'] },
    { commandName: 'rotateViewportCCW', label: 'Rotate Left', keys: ['l'] },
    { commandName: 'invertViewport', label: 'Invert', keys: ['i'] },
    { commandName: 'flipViewportHorizontal', label: 'Flip Horizontally', keys: ['h'] },
    { commandName: 'flipViewportVertical', label: 'Flip Vertically', keys: ['v'] },
    { commandName: 'scaleUpViewport', label: 'Zoom In', keys: ['+'] },
    { commandName: 'scaleDownViewport', label: 'Zoom Out', keys: ['-'] },
    { commandName: 'fitViewportToWindow', label: 'Zoom to Fit', keys: ['='] },
    { commandName: 'resetViewport', label: 'Reset', keys: ['space'] },
    { commandName: 'nextImage', label: 'Next Image', keys: ['down'] },
    { commandName: 'previousImage', label: 'Previous Image', keys: ['up'] },
  ],
  whiteLabeling: {
    createLogoComponentFn: function(React) {
      return React.createElement('div', {
        className: 'custom-logo'
      }, [
        React.createElement('span', {
          style: {
            color: 'white',
            fontWeight: 'bold',
            fontSize: '24px'
          }
        }, 'InnovationDX')
      ]);
    },
    createLogoComponentFnSplash: function(React) {
      return React.createElement('div', {
        className: 'custom-logo-splash'
      }, [
        React.createElement('span', {
          style: {
            color: 'white',
            fontWeight: 'bold',
            fontSize: '36px'
          }
        }, 'InnovationDX')
      ]);
    },
    showUserInformationModal: false
  },
  theme: {
    primary: '#0066CC',
    secondary: '#1A1A1A',
    accent: '#3B82F6',
    error: '#EF4444',
    info: '#3B82F6',
    success: '#22C55E',
    warning: '#F59E0B',
    background: '#FFFFFF',
    text: '#1A1A1A',
    textSecondary: '#4B5563',
    border: '#E5E7EB',
    hover: '#F3F4F6',
    active: '#EFF6FF',
  },
}; 
