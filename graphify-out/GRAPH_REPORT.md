# Graph Report - solar-layout-generator  (2026-08-25)

## Corpus Check
- 328 files · ~157,603 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 1689 nodes · 3766 edges · 122 communities (76 shown, 46 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS · INFERRED: 8 edges (avg confidence: 0.76)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `b277518f`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- card.tsx
- useCanvasInteractions.ts
- fluxRecomputeService.ts
- scripts
- useChat.ts
- devDependencies
- solarApiService.ts
- CanvasControls.tsx
- usePanelState.ts
- projectService.ts
- DashboardPage.tsx
- analysis.ts
- TariffControls.tsx
- pdf-service/package.json
- AnalysisSidebar.tsx
- compilerOptions
- digest.ts
- compilerOptions
- MapPage.tsx
- env.ts
- cn
- devDependencies
- routes/locations.ts
- ProjectsPage.tsx
- dependencies
- WorkbenchPage.tsx
- locationService.ts
- api/projects.ts
- toastConfig.tsx
- fluxRecomputeService.test.ts
- chat/index.ts
- api/locations.ts
- shared/index.ts
- components.json
- LandingPage.tsx
- AnalysisPage.tsx
- compilerOptions
- SystemCostCard.tsx
- useAuth.tsx
- button.tsx
- WorkbenchSidebar.tsx
- PrintReport.tsx
- shared/package.json
- src/errors.ts
- App.tsx
- app.ts
- routes/projects.ts
- express
- WorkbenchPage
- config.ts
- proj4
- backend/tsconfig.json
- @shared/types
- dependencies
- prompt.ts
- projectStatus.ts
- costModel.ts
- userService.ts
- overlayService.ts
- @googlemaps/js-api-loader
- useTheme.tsx
- results.ts
- billingEngine.ts
- seed.ts
- shared/tsconfig.json
- pdf-export.ts
- locationPipeline.ts
- streamChat.test.ts
- eslint.config.js
- backend/package.json
- SortableCardContainer.tsx
- AppErrorBoundary
- useAnalysisForm.ts
- AnalyticsPage.tsx
- api/pdf-export.ts
- MapPage.test.tsx
- AnalysisPage.test.tsx
- scripts
- client.test.ts
- digest.test.ts
- PanelPreview3D.tsx
- retry.test.ts
- better-auth
- dotenv-expand
- @google/genai
- compression
- errors.test.ts
- guardrails.test.ts
- @dnd-kit/core
- @dnd-kit/sortable
- @dnd-kit/utilities
- framer-motion
- i18next
- konva
- lucide-react
- next-themes
- i18next-browser-languagedetector
- @radix-ui/react-dialog
- @radix-ui/react-dropdown-menu
- @radix-ui/react-label
- @radix-ui/react-separator
- @radix-ui/react-slider
- @radix-ui/react-slot
- @radix-ui/react-tooltip
- react
- react-dom
- react-hot-toast
- react-i18next
- react-konva
- react-router-dom
- @react-three/drei
- @react-three/fiber
- recharts
- @shared/types
- tailwind-merge
- tailwindcss-animate
- three
- vaul

## God Nodes (most connected - your core abstractions)
1. `cn()` - 39 edges
2. `Button` - 32 edges
3. `useAuth()` - 25 edges
4. `formatCurrency()` - 23 edges
5. `apiFetch()` - 22 edges
6. `InfoTooltip()` - 20 edges
7. `Card` - 19 edges
8. `CardContent` - 19 edges
9. `useTheme()` - 19 edges
10. `WorkbenchPage()` - 19 edges

## Surprising Connections (you probably didn't know these)
- `ThemeProvider()` --indirect_call--> `handler()`  [INFERRED]
  frontend/src/hooks/useTheme.tsx → services/pdf-service/api/pdf-export.ts
- `PrintPage1Workbench()` --calls--> `getPanelModel()`  [EXTRACTED]
  frontend/src/components/pdf/PrintPage1Workbench.tsx → shared/panelModels.ts
- `buildPdfAnalysisViewModel()` --calls--> `computeSystemCost()`  [EXTRACTED]
  frontend/src/components/pdf/analysis/pdfAnalysisViewModel.ts → shared/costModel.ts
- `useAnalysisForm()` --calls--> `computeSystemCost()`  [EXTRACTED]
  frontend/src/hooks/useAnalysisForm.ts → shared/costModel.ts
- `WorkbenchPage()` --calls--> `getPanelModel()`  [EXTRACTED]
  frontend/src/pages/WorkbenchPage.tsx → shared/panelModels.ts

## Import Cycles
- None detected.

## Communities (122 total, 46 thin omitted)

### Community 0 - "card.tsx"
Cohesion: 0.14
Nodes (24): FinancialRoadmap(), FinancialRoadmapProps, Milestone, SystemAssumptions(), SystemAssumptionsProps, AppErrorBoundaryProps, AppErrorBoundaryState, PdfBillComparisonChart() (+16 more)

### Community 1 - "useCanvasInteractions.ts"
Cohesion: 0.08
Nodes (52): LocationImageGeoTransform, PdfPageShell(), Props, PrintPage1Workbench(), Props, useCanvasInteractions(), UseCanvasInteractionsOptions, aabbsOverlap() (+44 more)

### Community 2 - "fluxRecomputeService.ts"
Cohesion: 0.17
Nodes (20): calculateAverageFlux(), computeMonthlyEnergy(), computeMonthlyEnergyFromRasters(), pointInPolygon(), PreloadedFluxRasters, preloadFluxRasters(), getRotatedCorners(), rotatePoint() (+12 more)

### Community 3 - "scripts"
Cohesion: 0.04
Nodes (45): concurrently, eslint, @eslint/js, eslint-plugin-react-hooks, globals, dependencies, @prisma/client, devDependencies (+37 more)

### Community 4 - "useChat.ts"
Cohesion: 0.09
Nodes (26): ChatLauncher(), ChatLauncherProps, ChatPanel(), ChatPanelProps, getPaybackYears(), ChatContextValue, ChatMessage, ChatProvider() (+18 more)

### Community 5 - "devDependencies"
Cohesion: 0.05
Nodes (36): autoprefixer, devDependencies, autoprefixer, jsdom, tailwindcss, @tailwindcss/vite, @testing-library/react, @types/google.maps (+28 more)

### Community 6 - "solarApiService.ts"
Cohesion: 0.09
Nodes (40): convertRgbTiffToPng(), toArrayBuffer(), DownloadedLayer, downloadLayer(), fetchLocationPipelineInputs(), getLayerUrl(), LAYER_FILENAMES, PipelineFetchResult (+32 more)

### Community 7 - "CanvasControls.tsx"
Cohesion: 0.16
Nodes (17): CanvasControls(), CanvasControlsProps, CollapseIcon(), DeleteIcon(), ExpandIcon(), LayersIcon(), MarqueeIcon(), RedoIcon() (+9 more)

### Community 8 - "usePanelState.ts"
Cohesion: 0.13
Nodes (28): roofSegments, solarPanels, roofSegments, setup(), solarPanels, getPanelAnnualEnergy(), getSortedPanelIds(), UndoRedoSnapshot (+20 more)

### Community 9 - "projectService.ts"
Cohesion: 0.12
Nodes (34): createProject(), deleteProject(), findOwnedProject(), getPdfProjectData(), getProject(), listProjects(), saveAnalysis(), saveLayout() (+26 more)

### Community 10 - "DashboardPage.tsx"
Cohesion: 0.12
Nodes (24): formatDisplay(), TARIFF_FIELDS, TariffField, TariffParameterModal(), TariffParameterModalProps, CoverageNoticeModal(), Props, writeCoverageNoticeDismissed() (+16 more)

### Community 11 - "analysis.ts"
Cohesion: 0.26
Nodes (17): AnalysisDisclaimerKey, AnalysisMode, InverterReplacement, buildNetBenefitSeries(), computeDegradedSavings(), NetBenefitPoint, normalizeInverterReplacements(), round2() (+9 more)

### Community 12 - "TariffControls.tsx"
Cohesion: 0.12
Nodes (19): LifecycleControlsProps, TariffControlsProps, DropdownMenu(), DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuRadioItem (+11 more)

### Community 13 - "pdf-service/package.json"
Cohesion: 0.07
Nodes (27): puppeteer-core, dependencies, puppeteer-core, @sparticuz/chromium, zod, description, devDependencies, @types/node (+19 more)

### Community 14 - "AnalysisSidebar.tsx"
Cohesion: 0.16
Nodes (12): AnalysisSidebar(), AnalysisSidebarProps, ConsumptionControls(), ConsumptionControlsProps, LifecycleControls(), TariffControls(), ImagePopup(), ImagePopupProps (+4 more)

### Community 15 - "compilerOptions"
Cohesion: 0.08
Nodes (24): dist, node_modules, compilerOptions, allowImportingTsExtensions, declaration, declarationMap, esModuleInterop, forceConsistentCasingInFileNames (+16 more)

### Community 16 - "digest.ts"
Cohesion: 0.12
Nodes (30): bucketByOrientation(), ChatPage, ChatProject, countActivePanels(), countSegmentsUsed(), describeInverterReplacements(), formatMaybeNumber(), formatNumber() (+22 more)

### Community 17 - "compilerOptions"
Cohesion: 0.08
Nodes (23): compilerOptions, jsx, lib, noEmit, paths, rootDir, types, exclude (+15 more)

### Community 18 - "MapPage.tsx"
Cohesion: 0.15
Nodes (19): getLocationStatus(), createProject(), readCoverageNoticeDismissed(), LowerResolutionConsentModal(), ManualCoordinateModal(), ensureLoaded(), loader, useGoogleMaps() (+11 more)

### Community 19 - "env.ts"
Cohesion: 0.05
Nodes (59): allowedOrigins, app, __dirname, auth, __dirname, env, envSchema, parsed (+51 more)

### Community 20 - "cn"
Cohesion: 0.13
Nodes (17): GroupPanel, GroupRotationHandle(), GroupRotationHandleProps, getPanelColorByRatio(), panelAnnualEnergy(), PanelLayer(), PanelLayerProps, RenderPanel (+9 more)

### Community 21 - "devDependencies"
Cohesion: 0.10
Nodes (21): devDependencies, prisma, tsx, @types/compression, @types/cors, @types/express, @types/jsonwebtoken, @types/node (+13 more)

### Community 22 - "routes/locations.ts"
Cohesion: 0.21
Nodes (10): Express, extractToken(), Request, requirePdfToken(), InvalidPdfTokenError, PdfTokenPayload, SignedPdfToken, signPdfToken() (+2 more)

### Community 23 - "ProjectsPage.tsx"
Cohesion: 0.09
Nodes (31): listProjects(), ProjectResponse, formatRelativeDate(), PortfolioStats, projectRoute(), ProjectCard(), PageContainer(), PageContainerProps (+23 more)

### Community 24 - "dependencies"
Cohesion: 0.11
Nodes (19): @aws-sdk/client-s3, @aws-sdk/s3-request-presigner, dependencies, @aws-sdk/client-s3, @aws-sdk/s3-request-presigner, cors, dotenv, jsonwebtoken (+11 more)

### Community 25 - "WorkbenchPage.tsx"
Cohesion: 0.09
Nodes (23): getModalPosition(), GuidedTour(), GuidedTourModal(), TourStep, DEFAULT_HINTS, LoadingOverlay(), CanvasLegends(), CanvasLegendsProps (+15 more)

### Community 26 - "locationService.ts"
Cohesion: 0.11
Nodes (26): parseBuildingInsights(), getLocationDataForUser(), getLocationDataResponseForUser(), getLocationStatusForUser(), getLocationStatusResponseForUser(), getOverlayResponseForUser(), linkOwnedProjectToLocation(), probeLocation() (+18 more)

### Community 27 - "api/projects.ts"
Cohesion: 0.21
Nodes (11): getLocationData(), getProject(), PdfExportToken, ProjectAnalysisConfig, decodeBase64(), DecodedRoofMask, useWorkbenchData(), CreateProjectRequest (+3 more)

### Community 28 - "toastConfig.tsx"
Cohesion: 0.15
Nodes (17): AppNav(), Crumb, useBreadcrumbs(), Notification, NotificationPopover(), useNotifications(), formatReset(), useQuota() (+9 more)

### Community 29 - "fluxRecomputeService.test.ts"
Cohesion: 0.09
Nodes (19): BuildingInsightsDto, buildingInsightsSchema, latLngSchema, PanelSpecs, parsePanelSpecs(), solarPanelSchema, solarPotentialSchema, validateFluxLocation() (+11 more)

### Community 30 - "chat/index.ts"
Cohesion: 0.07
Nodes (39): ClientMode, getGenAIClient(), invalidateForAuthFailure(), categoriseError(), ChatLanguage, ErrorCategory, getErrorCode(), localiseErrorMessage() (+31 more)

### Community 31 - "api/locations.ts"
Cohesion: 0.16
Nodes (14): ApiError, apiFetch(), LocationDataWithGeoTransform, probeLocation(), recomputeFlux(), recomputeFluxBatch(), resolveLocation(), deleteProject() (+6 more)

### Community 32 - "shared/index.ts"
Cohesion: 0.17
Nodes (18): filterByDirection(), PanelYieldEntry, RoofSegmentEntry, SIZING_GOAL_OFFSET, azimuthMatchesRoofDirection(), ROOF_DIRECTION_WINDOWS, segmentMatchesRoofDirection(), SegmentWithAzimuth (+10 more)

### Community 33 - "components.json"
Cohesion: 0.12
Nodes (16): aliases, components, hooks, lib, ui, utils, rsc, $schema (+8 more)

### Community 34 - "LandingPage.tsx"
Cohesion: 0.14
Nodes (7): HERO_PROFILES, HeroProfile, LandingPage(), PipelineStep, useHeroTicker(), useScrollY(), useAuthMock

### Community 35 - "AnalysisPage.tsx"
Cohesion: 0.14
Nodes (23): saveAnalysis(), BillComparisonChart(), BillComparisonChartProps, ChartTooltipContent(), ChartTooltipContentProps, TooltipEntry, NetBenefitChart(), NetBenefitChartProps (+15 more)

### Community 36 - "compilerOptions"
Cohesion: 0.12
Nodes (16): api/**/*.ts, ES2022, compilerOptions, allowSyntheticDefaultImports, esModuleInterop, isolatedModules, lib, module (+8 more)

### Community 37 - "SystemCostCard.tsx"
Cohesion: 0.22
Nodes (9): getOverlayUrl(), requestPdfExportToken(), BASE_STYLE, baseOptions, notify, buildPdfFileName(), sanitizeFileName(), useLoadedImage() (+1 more)

### Community 38 - "useAuth.tsx"
Cohesion: 0.10
Nodes (24): App(), LanguageToggle(), AuthProbe(), { notifyErrorMock, signInEmailMock, signInSocialMock, signOutMock, signUpEmailMock, useSessionMock }, SessionState, AuthContext, AuthContextValue, AuthError (+16 more)

### Community 39 - "button.tsx"
Cohesion: 0.11
Nodes (17): GoogleSignInButton(), GoogleSignInButtonProps, ThemeToggle(), Input, Logo(), LogoProps, useAuth(), Section (+9 more)

### Community 40 - "WorkbenchSidebar.tsx"
Cohesion: 0.15
Nodes (20): BillBreakdown(), BillBreakdownProps, SimulationMonth, MonthTable(), MonthTableProps, getRoiCondition(), RoiCondition, SystemMetaCard() (+12 more)

### Community 41 - "PrintReport.tsx"
Cohesion: 0.18
Nodes (13): getProjectForPdf(), getTariffConfig(), FooterProps, HeaderProps, PdfFixedFooter(), PdfFixedHeader(), PrintReport(), PrintReportProps (+5 more)

### Community 42 - "shared/package.json"
Cohesion: 0.13
Nodes (14): devDependencies, typescript, exports, typescript, license, main, name, private (+6 more)

### Community 43 - "src/errors.ts"
Cohesion: 0.27
Nodes (7): MODEL_CELL_COLORS, ModelCard(), PanelModelDrawer(), PanelModelDrawerProps, PanelPreview3D, PANEL_MODELS, PanelModel

### Community 44 - "App.tsx"
Cohesion: 0.08
Nodes (21): AnalysisPage, AnalyticsPage, DashboardPage, FAQPage, MapPage, NotFoundPage, PAGE_LOADING_HINTS, PdfPreviewPage (+13 more)

### Community 45 - "app.ts"
Cohesion: 0.29
Nodes (6): Slider, SelectedPanelData, UiMessage, WorkbenchSidebar(), WorkbenchSidebarProps, BatchRecomputeStatus

### Community 46 - "routes/projects.ts"
Cohesion: 0.11
Nodes (21): hits, pdfTokenRateLimit(), createProjectSchema, saveAnalysisSchema, saveLayoutSchema, updateLayoutPreferencesSchema, AnalysisConfigDto, analysisConfigSchema (+13 more)

### Community 48 - "WorkbenchPage"
Cohesion: 0.24
Nodes (8): saveLayoutPreferences(), useWorkbenchSave(), billRangeToAnnualKwh(), describeLayoutPreset(), inferVisibleCount(), panels(), getPanelAnnualEnergy(), WorkbenchPage()

### Community 49 - "config.ts"
Cohesion: 0.26
Nodes (13): AnalysisConfig, ConnectionPhase, DEFAULT_INVERTER_REPLACEMENT, getConnectionPhase(), getConsumptionProfile(), getNumber(), getRoofType(), getTariffRatesOverride() (+5 more)

### Community 51 - "backend/tsconfig.json"
Cohesion: 0.17
Nodes (11): compilerOptions, outDir, rootDir, exclude, extends, include, src/**/*.test.ts, src/**/*.ts (+3 more)

### Community 53 - "dependencies"
Cohesion: 0.18
Nodes (11): class-variance-authority, dependencies, better-auth, class-variance-authority, proj4, react-markdown, @tanstack/react-query, better-auth (+3 more)

### Community 54 - "prompt.ts"
Cohesion: 0.60
Nodes (4): Props, readPermanentDismiss(), WorkbenchHintOverlay(), writePermanentDismiss()

### Community 55 - "projectStatus.ts"
Cohesion: 0.33
Nodes (9): BadgeVariant, getProjectStatusConfig(), getProjectStatusLabel(), getProjectStatusTooltip(), getProjectStatusVariant(), STATUS_CONFIGS, StatusConfig, ALL_STATUSES (+1 more)

### Community 56 - "costModel.ts"
Cohesion: 0.25
Nodes (9): computeSystemCost(), CostInputs, costModelDefaults, electricalBosCost(), InverterSku, permitCost(), scaffoldingCost(), selectInverter() (+1 more)

### Community 57 - "userService.ts"
Cohesion: 0.27
Nodes (10): checkQuota(), { count, findUnique }, countProjectsSinceUtcMidnight(), getQuotaSummary(), getUserTier(), nextUtcMidnight(), startOfUtcDay(), QuotaSummary (+2 more)

### Community 58 - "overlayService.ts"
Cohesion: 0.19
Nodes (11): r2, ColorStop, dsmStops, fluxStops, getOrGenerateOverlay(), getStopsForType(), lerpColor(), maskStops (+3 more)

### Community 60 - "useTheme.tsx"
Cohesion: 0.43
Nodes (6): getSystemTheme(), resolveTheme(), Theme, ThemeContext, ThemeContextValue, ThemeProvider()

### Community 61 - "results.ts"
Cohesion: 0.60
Nodes (4): getProjectLastVisitedAt(), markProjectVisited(), readEntries(), RecentProjectActivity

### Community 62 - "billingEngine.ts"
Cohesion: 0.30
Nodes (12): AnnualSimulationResult, BillBreakdown, BillingConfig, computeBill(), computeNemMonth(), lookupEeiRebate(), round2(), round5sen() (+4 more)

### Community 63 - "seed.ts"
Cohesion: 0.25
Nodes (6): __dirname, EEI_TABLE, prisma, RATES, THRESHOLDS, TariffDefaults

### Community 64 - "shared/tsconfig.json"
Cohesion: 0.22
Nodes (8): *.ts, compilerOptions, composite, outDir, rootDir, extends, include, ../tsconfig.json

### Community 65 - "pdf-export.ts"
Cohesion: 0.36
Nodes (8): BodySchema, handler(), normalizeOrigin(), PAGE_MARGIN, parseAllowedOrigins(), resolveCorsOrigin(), setCorsHeaders(), VIEWPORT

### Community 66 - "locationPipeline.ts"
Cohesion: 0.33
Nodes (8): geotiff, ImageGeoTransform, loadGeoTIFFWithFallback(), loadReferenceGeoTransform(), loadRoofMask(), RoofMaskResult, uniquePaths(), geotiff

### Community 68 - "eslint.config.js"
Cohesion: 0.32
Nodes (7): globals, isOff(), prettier, reactHooks, tseslint, typescriptFiles, warnings()

### Community 70 - "backend/package.json"
Cohesion: 0.29
Nodes (6): license, name, prisma, seed, private, type

### Community 72 - "SortableCardContainer.tsx"
Cohesion: 0.43
Nodes (5): CardItem, loadOrder(), reconcile(), saveOrder(), SortableCardContainer()

### Community 74 - "useAnalysisForm.ts"
Cohesion: 0.17
Nodes (20): buildPdfAnalysisViewModel(), PdfAnalysisViewModel, ChartDataPoint, useAnalysisForm(), aggregateMonthlyGeneration(), AnalysisChartDataPoint, applyPerformanceRatio(), applySeasonalProfile() (+12 more)

### Community 75 - "AnalyticsPage.tsx"
Cohesion: 0.21
Nodes (8): aggregatePortfolio(), StatCard(), CardDescription, AnalyticsPage(), ComparisonMetric, METRIC_FORMATTERS, listProjectsMock, navigateMock

### Community 78 - "api/pdf-export.ts"
Cohesion: 0.33
Nodes (5): maxDuration, memory, functions, api/pdf-export.ts, $schema

### Community 79 - "MapPage.test.tsx"
Cohesion: 0.22
Nodes (6): createProjectMock, getLocationStatusMock, getProjectMock, navigateMock, probeLocationMock, resolveLocationMock

### Community 80 - "AnalysisPage.test.tsx"
Cohesion: 0.25
Nodes (6): handleExportPdfMock, markProjectVisitedMock, navigateMock, notifyErrorMock, notifySuccessMock, saveAnalysisMock

### Community 81 - "scripts"
Cohesion: 0.40
Nodes (5): scripts, build, dev, start, test

## Knowledge Gaps
- **587 isolated node(s):** `name`, `private`, `license`, `type`, `dev` (+582 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **46 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `dependencies` connect `dependencies` to `locationPipeline.ts`, `backend/package.json`, `express`, `proj4`, `@shared/types`, `better-auth`, `dotenv-expand`, `@google/genai`, `compression`?**
  _High betweenness centrality (0.067) - this node is a cross-community bridge._
- **Why does `geotiff` connect `locationPipeline.ts` to `dependencies`, `fluxRecomputeService.ts`, `overlayService.ts`, `solarApiService.ts`?**
  _High betweenness centrality (0.067) - this node is a cross-community bridge._
- **Why does `loadFluxData()` connect `fluxRecomputeService.ts` to `locationPipeline.ts`?**
  _High betweenness centrality (0.052) - this node is a cross-community bridge._
- **What connects `name`, `private`, `license` to the rest of the system?**
  _587 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `card.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.13911290322580644 - nodes in this community are weakly interconnected._
- **Should `useCanvasInteractions.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.07578084997439836 - nodes in this community are weakly interconnected._
- **Should `scripts` be split into smaller, more focused modules?**
  _Cohesion score 0.043478260869565216 - nodes in this community are weakly interconnected._