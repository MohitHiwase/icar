import { ToolCategory, WorkflowTemplate, ProcessingJob, AIInsight, ConsoleLog } from './types';

export const TOOL_CATEGORIES: ToolCategory[] = [
  {
    id: 'raster',
    title: 'Raster Analysis',
    icon: 'grid_on',
    badgeColor: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20',
    items: [
      {
        id: 'tool-ndvi',
        name: 'NDVI Index',
        category: 'raster',
        icon: 'eco',
        description: 'Normalized Difference Vegetation Health Index (NIR - Red) / (NIR + Red).',
        defaultParams: { nirBand: 'B8 (842nm)', redBand: 'B4 (665nm)', thresholdMin: 0.2, thresholdMax: 0.9, format: 'Float32' }
      },
      {
        id: 'tool-evi',
        name: 'EVI Calculation',
        category: 'raster',
        icon: 'nature_people',
        description: 'Enhanced Vegetation Index optimized for high canopy density regions.',
        defaultParams: { gainG: 2.5, c1: 6.0, c2: 7.5, L: 1.0, blueBand: 'B2' }
      },
      {
        id: 'tool-raster-calc',
        name: 'Raster Calculator',
        category: 'raster',
        icon: 'calculate',
        description: 'Custom map algebra expressions using NumPy syntax on multi-band rasters.',
        defaultParams: { expression: '(B8 - B4) / (B8 + B4 + 0.1)', clampMin: -1.0, clampMax: 1.0 }
      },
      {
        id: 'tool-band-combo',
        name: 'Band Combination',
        category: 'raster',
        icon: 'layers',
        description: 'Synthesize RGB composites (False Color Agriculture, Urban, Atmospheric).',
        defaultParams: { redChannel: 'B8 (NIR)', greenChannel: 'B4 (Red)', blueChannel: 'B3 (Green)', stretch: 'Linear 2%' }
      },
      {
        id: 'tool-terrain',
        name: 'Terrain Analysis',
        category: 'raster',
        icon: 'terrain',
        description: 'Compute Slope (%), Aspect (deg), and Hillshade from Copernicus DEM.',
        defaultParams: { zFactor: 1.0, azimuth: 315, altitude: 45, algorithm: 'ZevenbergenThorne' }
      }
    ]
  },
  {
    id: 'vector',
    title: 'Vector Analysis',
    icon: 'polyline',
    badgeColor: 'bg-teal-500/10 text-teal-600 dark:text-teal-400 border-teal-500/20',
    items: [
      {
        id: 'tool-buffer',
        name: 'Spatial Buffer',
        category: 'vector',
        icon: 'radar',
        description: 'Create geodesic buffer zones around parcel boundaries or water channels.',
        defaultParams: { distanceMeters: 500, endCap: 'Round', joinStyle: 'Miter', dissolveResult: true }
      },
      {
        id: 'tool-clip',
        name: 'Clip Geometry',
        category: 'vector',
        icon: 'content_cut',
        description: 'Extract vector features intersecting a study area boundary layer.',
        defaultParams: { spatialIndex: 'RTree', preserveAttributes: true }
      },
      {
        id: 'tool-intersect',
        name: 'Intersect Layers',
        category: 'vector',
        icon: 'join_inner',
        description: 'Overlay polygon layers to find spatial intersections and shared extents.',
        defaultParams: { outputType: 'Polygon', attributeJoin: 'ALL' }
      },
      {
        id: 'tool-union',
        name: 'Union Features',
        category: 'vector',
        icon: 'join_full',
        description: 'Combine boundaries of multiple shapefile layers into a single dataset.',
        defaultParams: { validateGaps: true, simplifyTolerance: 0.0001 }
      },
      {
        id: 'tool-dissolve',
        name: 'Dissolve Boundaries',
        category: 'vector',
        icon: 'select_all',
        description: 'Aggregate contiguous polygon boundaries based on shared attribute fields.',
        defaultParams: { dissolveField: 'crop_type', computeStats: 'SUM(area_ha)' }
      }
    ]
  },
  {
    id: 'ai',
    title: 'AI Analysis',
    icon: 'psychology',
    badgeColor: 'bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20',
    items: [
      {
        id: 'tool-crop-cls',
        name: 'Crop Classification',
        category: 'ai',
        icon: 'grass',
        description: 'Random Forest & UNet multi-temporal crop species classification (Wheat, Maize, Rice).',
        defaultParams: { model: 'RF-CropNet-v3', nEstimators: 200, maxDepth: 15, confidenceCutoff: 0.85 }
      },
      {
        id: 'tool-health-eval',
        name: 'Crop Health Assessment',
        category: 'ai',
        icon: 'health_and_safety',
        description: 'Deep learning stress detection identifying nitrogen deficiency and pest damage.',
        defaultParams: { anomalyThreshold: 0.75, sensitivity: 'High', outputHeatmap: true }
      },
      {
        id: 'tool-yield-pred',
        name: 'Yield Prediction',
        category: 'ai',
        icon: 'trending_up',
        description: 'Predict agricultural yield (Tons/Hectare) combining NDVI, soil moisture, and weather GT.',
        defaultParams: { GDD_BaseTemp: 10, weatherWindowDays: 60, modelEngine: 'XGBoost-AgriYield' }
      },
      {
        id: 'tool-soil-suit',
        name: 'Soil Suitability Analysis',
        category: 'ai',
        icon: 'landscape',
        description: 'Multi-criteria evaluation (MCE) for crop soil compatibility and pH suitability.',
        defaultParams: { pHWeight: 0.35, organicMatterWeight: 0.40, slopeWeight: 0.25 }
      },
      {
        id: 'tool-cloud-det',
        name: 'Cloud Detection',
        category: 'ai',
        icon: 'cloud',
        description: 'DeepLabV3+ cloud & shadow segmentation mask generation.',
        defaultParams: { dilationPixels: 3, shadowOffsetMeters: 120, cloudThreshold: 0.15 }
      },
      {
        id: 'tool-cloud-rem',
        name: 'Cloud Removal',
        category: 'ai',
        icon: 'filter_drama',
        description: 'Multi-temporal GAN inpainting to synthesize cloud-free multispectral tiles.',
        defaultParams: { temporalWindowDays: 15, ganWeights: 'Synthetic-GAN-v2', blendEdgeMeters: 30 }
      },
      {
        id: 'tool-change-det',
        name: 'Change Detection',
        category: 'ai',
        icon: 'difference',
        description: 'Bitemporal change detection measuring land cover transformations.',
        defaultParams: { t1Dataset: 'Sentinel-2_Jan2026', t2Dataset: 'Sentinel-2_Jul2026', method: 'SiamDiff' }
      }
    ]
  },
  {
    id: 'utility',
    title: 'Utilities',
    icon: 'construction',
    badgeColor: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20',
    items: [
      {
        id: 'tool-data-merge',
        name: 'Data Merge',
        category: 'utility',
        icon: 'call_merge',
        description: 'Mosaic multiple GeoTIFF raster tiles into a single seamless continuous raster.',
        defaultParams: { resampling: 'Bilinear', nodataValue: -9999, compress: 'LZW' }
      },
      {
        id: 'tool-reprojection',
        name: 'Reprojection',
        category: 'utility',
        icon: 'transform',
        description: 'Transform spatial dataset coordinate reference system (e.g. EPSG:4326 -> EPSG:3857).',
        defaultParams: { targetCrs: 'EPSG:3857 (Web Mercator)', datumTransform: 'WGS84_Auto' }
      },
      {
        id: 'tool-coord-conv',
        name: 'Coordinate Conversion',
        category: 'utility',
        icon: 'location_on',
        description: 'Batch convert Lat/Lon coordinates between MGRS, UTM, and Decimal Degrees.',
        defaultParams: { outputDatum: 'WGS 84', precisionDigits: 6 }
      },
      {
        id: 'tool-geom-val',
        name: 'Geometry Validation',
        category: 'utility',
        icon: 'fact_check',
        description: 'Inspect and fix self-intersecting polygons, invalid rings, and sliver geometries.',
        defaultParams: { fixSelfIntersection: true, minPolygonAreaHa: 0.01 }
      },
      {
        id: 'tool-zonal-stats',
        name: 'Zonal Statistics',
        category: 'utility',
        icon: 'query_stats',
        description: 'Calculate Mean, Max, Min, StdDev raster values within polygon zones.',
        defaultParams: { stats: ['Mean', 'Max', 'Min', 'StdDev'], prefix: 'ndvi_' }
      }
    ]
  }
];

export const WORKFLOW_TEMPLATES: WorkflowTemplate[] = [
  {
    id: 'tmpl-ndvi',
    name: 'NDVI Crop Monitoring',
    description: 'Cloud masking, NDVI raster calculation, and vegetation health classification.',
    category: 'Vegetation',
    icon: 'eco',
    nodes: [
      {
        id: 'n-1',
        toolId: 'input-dataset',
        title: 'Sentinel-2 L2A Tile',
        category: 'input',
        type: 'input',
        icon: 'satellite_alt',
        description: 'Raw multispectral satellite scene (Karnal Sector, 10m resolution).',
        status: 'completed',
        inputDataset: 'Sentinel2_L2A_Karnal_2026.tif',
        outputDataset: 'Sentinel2_L2A_Karnal_2026.tif',
        params: { bandRed: 'B4', bandNIR: 'B8', acquisitionDate: '2026-07-15' },
        estimatedRuntime: '0s (Loaded)',
        computeCost: 'Free',
        validationStatus: 'valid',
        position: { x: 50, y: 80 }
      },
      {
        id: 'n-2',
        toolId: 'tool-cloud-rem',
        title: 'Cloud Removal (GAN)',
        category: 'ai',
        type: 'process',
        icon: 'filter_drama',
        description: 'Deep learning inpainting cloud mask filter.',
        status: 'completed',
        inputDataset: 'Sentinel2_L2A_Karnal_2026.tif',
        outputDataset: 'CloudFree_Scene_Karnal.tif',
        params: { temporalWindowDays: 15, blendEdgeMeters: 30, cloudThreshold: 0.15 },
        estimatedRuntime: '~14s',
        computeCost: '0.4 Credits ($0.02)',
        validationStatus: 'valid',
        position: { x: 340, y: 80 }
      },
      {
        id: 'n-3',
        toolId: 'tool-ndvi',
        title: 'NDVI Calculation',
        category: 'raster',
        type: 'process',
        icon: 'eco',
        description: 'Compute vegetation index raster.',
        status: 'completed',
        inputDataset: 'CloudFree_Scene_Karnal.tif',
        outputDataset: 'NDVI_Raster_Karnal.tif',
        params: { nirBand: 'B8 (842nm)', redBand: 'B4 (665nm)', thresholdMin: 0.2, thresholdMax: 0.9 },
        estimatedRuntime: '~8s',
        computeCost: '0.2 Credits ($0.01)',
        validationStatus: 'valid',
        position: { x: 630, y: 80 }
      },
      {
        id: 'n-4',
        toolId: 'tool-crop-cls',
        title: 'Crop Classification',
        category: 'ai',
        type: 'process',
        icon: 'grass',
        description: 'Random Forest species identification.',
        status: 'idle',
        inputDataset: 'NDVI_Raster_Karnal.tif',
        outputDataset: 'Classified_Crops_Karnal.geojson',
        params: { model: 'RF-CropNet-v3', nEstimators: 200, confidenceCutoff: 0.85 },
        estimatedRuntime: '~22s',
        computeCost: '0.6 Credits ($0.03)',
        validationStatus: 'valid',
        position: { x: 920, y: 80 }
      },
      {
        id: 'n-5',
        toolId: 'output-report',
        title: 'Spatial PDF Report',
        category: 'output',
        type: 'output',
        icon: 'assessment',
        description: 'Synthesize PDF report with zone statistics and acreage summary.',
        status: 'idle',
        inputDataset: 'Classified_Crops_Karnal.geojson',
        outputDataset: 'Crop_Health_Summary_2026.pdf',
        params: { includeCharts: true, format: 'PDF & GeoJSON' },
        estimatedRuntime: '~4s',
        computeCost: '0.1 Credits',
        validationStatus: 'valid',
        position: { x: 1210, y: 80 }
      }
    ],
    connections: [
      { id: 'c-1', fromNodeId: 'n-1', toNodeId: 'n-2', active: true },
      { id: 'c-2', fromNodeId: 'n-2', toNodeId: 'n-3', active: true },
      { id: 'c-3', fromNodeId: 'n-3', toNodeId: 'n-4', active: true },
      { id: 'c-4', fromNodeId: 'n-4', toNodeId: 'n-5', active: true }
    ]
  },
  {
    id: 'tmpl-soil',
    name: 'Soil Fertility & Moisture Mapping',
    description: 'Combine satellite moisture index with soil CSV measurements for zonal fertility map.',
    category: 'Soil & Agriculture',
    icon: 'landscape',
    nodes: [
      {
        id: 's-1',
        toolId: 'input-dataset',
        title: 'Soil Grid CSV Data',
        category: 'input',
        type: 'input',
        icon: 'grid_on',
        description: 'Point samples containing NPK, pH, and Moisture values.',
        status: 'completed',
        inputDataset: 'Soil_Samples_Karnal_Sector.csv',
        outputDataset: 'Soil_Samples_Karnal_Sector.csv',
        params: { latCol: 'Latitude', lonCol: 'Longitude', crs: 'EPSG:4326' },
        estimatedRuntime: '0s',
        computeCost: 'Free',
        validationStatus: 'valid',
        position: { x: 50, y: 80 }
      },
      {
        id: 's-2',
        toolId: 'tool-soil-suit',
        title: 'Soil Suitability Analysis',
        category: 'ai',
        type: 'process',
        icon: 'landscape',
        description: 'Multi-criteria evaluation for soil crop compatibility.',
        status: 'idle',
        inputDataset: 'Soil_Samples_Karnal_Sector.csv',
        outputDataset: 'Soil_Suitability_Index.tif',
        params: { pHWeight: 0.35, organicMatterWeight: 0.40, slopeWeight: 0.25 },
        estimatedRuntime: '~18s',
        computeCost: '0.5 Credits ($0.02)',
        validationStatus: 'valid',
        position: { x: 340, y: 80 }
      },
      {
        id: 's-3',
        toolId: 'tool-zonal-stats',
        title: 'Zonal Statistics',
        category: 'utility',
        type: 'process',
        icon: 'query_stats',
        description: 'Aggregate mean soil score per parcel polygon.',
        status: 'idle',
        inputDataset: 'Soil_Suitability_Index.tif',
        outputDataset: 'Parcel_Soil_Fertility.geojson',
        params: { stats: ['Mean', 'Max', 'Min'], prefix: 'soil_' },
        estimatedRuntime: '~10s',
        computeCost: '0.3 Credits',
        validationStatus: 'valid',
        position: { x: 630, y: 80 }
      }
    ],
    connections: [
      { id: 'sc-1', fromNodeId: 's-1', toNodeId: 's-2', active: true },
      { id: 'sc-2', fromNodeId: 's-2', toNodeId: 's-3', active: true }
    ]
  },
  {
    id: 'tmpl-flood',
    name: 'Flood Risk & Inundation Mapping',
    description: 'Sentinel-1 SAR backscatter thresholding to delineate flooded crop fields.',
    category: 'Disaster Risk',
    icon: 'water',
    nodes: [
      {
        id: 'f-1',
        toolId: 'input-dataset',
        title: 'Sentinel-1 SAR Scene',
        category: 'input',
        type: 'input',
        icon: 'satellite_alt',
        description: 'C-band synthetic aperture radar imagery.',
        status: 'completed',
        inputDataset: 'Sentinel1_SAR_IW_GRD_2026.tif',
        outputDataset: 'Sentinel1_SAR_IW_GRD_2026.tif',
        params: { polarization: 'VV+VH', speckleFilter: 'Lee 7x7' },
        estimatedRuntime: '0s',
        computeCost: 'Free',
        validationStatus: 'valid',
        position: { x: 50, y: 80 }
      },
      {
        id: 'f-2',
        toolId: 'tool-raster-calc',
        title: 'SAR Water Thresholding',
        category: 'raster',
        type: 'process',
        icon: 'calculate',
        description: 'Backscatter coefficient thresholding (VV < -14 dB).',
        status: 'idle',
        inputDataset: 'Sentinel1_SAR_IW_GRD_2026.tif',
        outputDataset: 'Water_Mask_SAR.tif',
        params: { expression: 'VV < -14.0', nodataValue: 0 },
        estimatedRuntime: '~12s',
        computeCost: '0.4 Credits',
        validationStatus: 'valid',
        position: { x: 340, y: 80 }
      },
      {
        id: 'f-3',
        toolId: 'tool-intersect',
        title: 'Parcel Risk Overlay',
        category: 'vector',
        type: 'process',
        icon: 'join_inner',
        description: 'Spatial intersection of flooded areas with agricultural cadastral parcels.',
        status: 'idle',
        inputDataset: 'Water_Mask_SAR.tif',
        outputDataset: 'Flooded_Parcels_Impact.geojson',
        params: { outputType: 'Polygon', attributeJoin: 'ALL' },
        estimatedRuntime: '~16s',
        computeCost: '0.5 Credits',
        validationStatus: 'valid',
        position: { x: 630, y: 80 }
      }
    ],
    connections: [
      { id: 'fc-1', fromNodeId: 'f-1', toNodeId: 'f-2', active: true },
      { id: 'fc-2', fromNodeId: 'f-2', toNodeId: 'f-3', active: true }
    ]
  }
];

export const MOCK_PROCESSING_JOBS: ProcessingJob[] = [
  {
    id: 'job-101',
    name: 'Karnal Sector NDVI & Crop Health Assessment',
    status: 'running',
    progress: 68,
    startTime: '15:08:12',
    duration: '00:00:42',
    nodesCount: 5,
    outputName: 'Karnal_Crop_Health_2026.geojson'
  },
  {
    id: 'job-100',
    name: 'Sentinel-2 Cloud Removal & Inpainting',
    status: 'completed',
    progress: 100,
    startTime: '14:45:00',
    duration: '00:01:14',
    nodesCount: 3,
    outputName: 'CloudFree_Sentinel2_Scene.tif'
  },
  {
    id: 'job-099',
    name: 'Punjab Basin Soil Fertility Index Map',
    status: 'completed',
    progress: 100,
    startTime: '12:30:15',
    duration: '00:00:52',
    nodesCount: 4,
    outputName: 'Punjab_Soil_Fertility.tif'
  },
  {
    id: 'job-098',
    name: 'Yamuna River Watershed Flood Risk Calculation',
    status: 'queued',
    progress: 0,
    startTime: '15:15:00',
    duration: '--:--:--',
    nodesCount: 3,
    outputName: 'Yamuna_Inundation_Risk.geojson'
  }
];

export const MOCK_AI_INSIGHTS: AIInsight[] = [
  {
    id: 'ins-1',
    type: 'positive',
    icon: 'trending_up',
    title: 'Vegetation Health Recovery',
    description: 'Vegetation health index (NDVI) improved by 14.2% across 73% of monitored agricultural plots in Karnal district over the last 15 days.',
    timestamp: '10 mins ago',
    metric: '+14.2% NDVI'
  },
  {
    id: 'ins-2',
    type: 'action',
    icon: 'water_drop',
    title: 'Soil Moisture Deficit Warning',
    description: 'Root-zone soil moisture is below the 20th percentile (14% volumetric water content) in 4 southern sectors. Targeted drip irrigation recommended within 5 days.',
    timestamp: '32 mins ago',
    metric: '14% Soil Water'
  },
  {
    id: 'ins-3',
    type: 'info',
    icon: 'filter_drama',
    title: 'Cloud Cover Filtered',
    description: 'Deep Learning inpainting successfully removed cloud and heavy shadow occlusion from 18 Sentinel-2 L2A tiles with 98.4% spatial fidelity.',
    timestamp: '1 hour ago',
    metric: '18 Scenes Processed'
  },
  {
    id: 'ins-4',
    type: 'warning',
    icon: 'pest_control',
    title: 'Crop Pest Stress Anomaly',
    description: 'Spatial clustering detected anomalous spectral reflectance drops in Sector HR-012, indicative of early fall armyworm infestation in maize crops.',
    timestamp: '2 hours ago',
    metric: 'Sector HR-012'
  }
];

export const MOCK_CONSOLE_LOGS: ConsoleLog[] = [
  { id: 'l-1', timestamp: '15:08:12', type: 'info', message: '[ORCHESTRATOR] Initializing workflow pipeline: NDVI Crop Monitoring' },
  { id: 'l-2', timestamp: '15:08:13', type: 'info', message: '[STORAGE] Validated input dataset: Sentinel2_L2A_Karnal_2026.tif (Size: 142.8 MB, CRS: EPSG:4326)' },
  { id: 'l-3', timestamp: '15:08:14', type: 'info', message: '[COMPUTE-NODE-4] Executing AI Cloud Detection & GAN Inpainting (DeepLabV3+)' },
  { id: 'l-4', timestamp: '15:08:24', type: 'success', message: '[COMPUTE-NODE-4] Cloud removal completed in 10.2s. 98.4% confidence mask generated.' },
  { id: 'l-5', timestamp: '15:08:25', type: 'info', message: '[RASTER-ENGINE] Calculating NDVI array (Band 8 NIR - Band 4 Red) / (Band 8 NIR + Band 4 Red)' },
  { id: 'l-6', timestamp: '15:08:32', type: 'success', message: '[RASTER-ENGINE] NDVI raster computed across 1,240,000 spatial pixels in 7.8s.' },
  { id: 'l-7', timestamp: '15:08:33', type: 'info', message: '[AI-ENGINE] Executing Random Forest Crop Classifier (RF-CropNet-v3)...' }
];

export const MOCK_DATASETS_LIST = [
  'Sentinel2_L2A_Karnal_2026.tif',
  'IMD_Rainfall_Grid_Jul2026.nc',
  'Soil_Samples_Karnal_Sector.csv',
  'Bhuvan_DEM_10m_Elevation.tif',
  'Sentinel1_SAR_IW_GRD_2026.tif',
  'Land_Cover_Vector_Parcels.geojson'
];
