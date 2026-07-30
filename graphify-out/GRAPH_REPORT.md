# Graph Report - solar-layout-generator  (2026-07-30)

## Corpus Check
- 314 files · ~151,229 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 1639 nodes · 3639 edges · 117 communities (71 shown, 46 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS · INFERRED: 8 edges (avg confidence: 0.76)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `4205cd70`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- AnalysisPage.tsx
- useCanvasInteractions.ts
- fluxRecomputeService.ts
- scripts
- ChatProvider.tsx
- devDependencies
- solarApiService.ts
- cn
- usePanelState.ts
- projectService.ts
- TariffParameterModal.tsx
- analysis.ts
- TariffControls.tsx
- pdf-service/package.json
- LayoutPresetModal.tsx
- compilerOptions
- digest.ts
- compilerOptions
- MapPage.tsx
- SignUpPage.test.tsx
- PanelLayer.tsx
- devDependencies
- routes/locations.ts
- DashboardPage.tsx
- dependencies
- WorkbenchPage.tsx
- locationService.ts
- api/projects.ts
- useAuth
- fluxRecomputeService.test.ts
- chat/index.ts
- shared/index.ts
- projectDtos.ts
- components.json
- LandingPage.tsx
- useChat.ts
- compilerOptions
- ChatPanel.tsx
- useLocale.tsx
- button.tsx
- useChat.test.tsx
- PrintReport.tsx
- shared/package.json
- src/errors.ts
- SignInPage.test.tsx
- app.ts
- routes/projects.ts
- express
- layoutPreset.ts
- jsonwebtoken
- proj4
- backend/tsconfig.json
- @shared/types
- dependencies
- zod
- projectStatus.ts
- costModel.ts
- userService.ts
- overlayService.ts
- @googlemaps/js-api-loader
- useOverlayImages.ts
- seed.ts
- shared/tsconfig.json
- pdf-export.ts
- locationPipeline.ts
- streamChat.test.ts
- eslint.config.js
- backend/package.json
- locationPipeline.test.ts
- SortableCardContainer.tsx
- AppErrorBoundary
- GuidedTour.tsx
- DashboardPage.test.tsx
- api/pdf-export.ts
- WorkbenchHintOverlay.tsx
- client.test.ts
- digest.test.ts
- PanelPreview3D.tsx
- retry.test.ts
- compression
- errors.test.ts
- guardrails.test.ts
- clsx
- @dnd-kit/core
- @dnd-kit/utilities
- framer-motion
- i18next
- konva
- lucide-react
- next-themes
- proj4
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
- @supabase/supabase-js
- tailwind-merge
- tailwindcss-animate
- three
- vaul

## God Nodes (most connected - your core abstractions)
1. `cn()` - 39 edges
2. `Button` - 32 edges
3. `apiFetch()` - 23 edges
4. `useAuth()` - 23 edges
5. `formatCurrency()` - 23 edges
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
- `WorkbenchPage()` --indirect_call--> `panels()`  [INFERRED]
  frontend/src/pages/WorkbenchPage.tsx → frontend/src/lib/layoutPreset.test.ts

## Import Cycles
- None detected.

## Communities (117 total, 46 thin omitted)

### Community 0 - "AnalysisPage.tsx"
Cohesion: 0.05
Nodes (89): saveAnalysis(), BillBreakdown(), BillBreakdownProps, SimulationMonth, BillComparisonChart(), BillComparisonChartProps, ChartTooltipContent(), ChartTooltipContentProps (+81 more)

### Community 1 - "useCanvasInteractions.ts"
Cohesion: 0.08
Nodes (52): LocationImageGeoTransform, PdfPageShell(), Props, PrintPage1Workbench(), Props, useCanvasInteractions(), UseCanvasInteractionsOptions, aabbsOverlap() (+44 more)

### Community 2 - "fluxRecomputeService.ts"
Cohesion: 0.18
Nodes (19): calculateAverageFlux(), computeMonthlyEnergy(), computeMonthlyEnergyFromRasters(), pointInPolygon(), PreloadedFluxRasters, preloadFluxRasters(), getRotatedCorners(), rotatePoint() (+11 more)

### Community 3 - "scripts"
Cohesion: 0.04
Nodes (45): concurrently, eslint, @eslint/js, eslint-plugin-react-hooks, globals, dependencies, @prisma/client, devDependencies (+37 more)

### Community 4 - "ChatProvider.tsx"
Cohesion: 0.22
Nodes (8): ChatLauncher(), ChatLauncherProps, ChatContext, ChatContextValue, ChatProvider(), EMPTY_CHAT_STATE, ProjectChatState, ChatLiveState

### Community 5 - "devDependencies"
Cohesion: 0.05
Nodes (36): autoprefixer, devDependencies, autoprefixer, jsdom, tailwindcss, @tailwindcss/vite, @testing-library/react, @types/google.maps (+28 more)

### Community 6 - "solarApiService.ts"
Cohesion: 0.15
Nodes (23): parseBuildingInsights(), downloadLayer(), fetchLocationPipelineInputs(), getLayerUrl(), LAYER_FILENAMES, PipelineFetchResult, SolarLayerKey, buildSolarParams() (+15 more)

### Community 7 - "cn"
Cohesion: 0.08
Nodes (35): Badge(), BadgeProps, badgeVariants, Separator, Skeleton(), Slider, TooltipContent, CanvasControls() (+27 more)

### Community 8 - "usePanelState.ts"
Cohesion: 0.15
Nodes (18): roofSegments, solarPanels, roofSegments, setup(), solarPanels, getPanelAnnualEnergy(), getSortedPanelIds(), UndoRedoSnapshot (+10 more)

### Community 9 - "projectService.ts"
Cohesion: 0.12
Nodes (30): ImageGeoTransform, createProject(), findOwnedProject(), getPdfProjectData(), getProject(), listProjects(), saveAnalysis(), saveLayout() (+22 more)

### Community 10 - "TariffParameterModal.tsx"
Cohesion: 0.17
Nodes (17): formatDisplay(), TARIFF_FIELDS, TariffField, TariffParameterModal(), TariffParameterModalProps, CoverageNoticeModal(), Props, writeCoverageNoticeDismissed() (+9 more)

### Community 11 - "analysis.ts"
Cohesion: 0.06
Nodes (80): getLocationData(), getProject(), buildPdfAnalysisViewModel(), PdfAnalysisViewModel, ChartDataPoint, useAnalysisForm(), decodeBase64(), DecodedRoofMask (+72 more)

### Community 12 - "TariffControls.tsx"
Cohesion: 0.09
Nodes (28): AnalysisSidebar(), AnalysisSidebarProps, ConsumptionControls(), ConsumptionControlsProps, LifecycleControls(), LifecycleControlsProps, TariffControls(), TariffControlsProps (+20 more)

### Community 13 - "pdf-service/package.json"
Cohesion: 0.07
Nodes (27): puppeteer-core, dependencies, puppeteer-core, @sparticuz/chromium, zod, description, devDependencies, @types/node (+19 more)

### Community 14 - "LayoutPresetModal.tsx"
Cohesion: 0.15
Nodes (15): ImagePopup(), ImagePopupProps, billLabel(), Goal, LayoutPresetModal(), LayoutPresetModalProps, BILL_RANGE_TO_KWH_PER_MONTH, BillRange (+7 more)

### Community 15 - "compilerOptions"
Cohesion: 0.08
Nodes (24): dist, node_modules, compilerOptions, allowImportingTsExtensions, declaration, declarationMap, esModuleInterop, forceConsistentCasingInFileNames (+16 more)

### Community 16 - "digest.ts"
Cohesion: 0.09
Nodes (36): bucketByOrientation(), ChatPage, ChatProject, countActivePanels(), countSegmentsUsed(), describeInverterReplacements(), formatMaybeNumber(), formatNumber() (+28 more)

### Community 17 - "compilerOptions"
Cohesion: 0.08
Nodes (23): compilerOptions, jsx, lib, noEmit, paths, rootDir, types, exclude (+15 more)

### Community 18 - "MapPage.tsx"
Cohesion: 0.06
Nodes (44): getLocationStatus(), createProject(), AnalysisPage, AnalyticsPage, App(), DashboardPage, FAQPage, MapPage (+36 more)

### Community 19 - "SignUpPage.test.tsx"
Cohesion: 0.33
Nodes (3): SignUpPage(), signUpMock, useAuthMock

### Community 20 - "PanelLayer.tsx"
Cohesion: 0.13
Nodes (17): GroupPanel, GroupRotationHandle(), GroupRotationHandleProps, getPanelColorByRatio(), panelAnnualEnergy(), PanelLayer(), PanelLayerProps, RenderPanel (+9 more)

### Community 21 - "devDependencies"
Cohesion: 0.10
Nodes (21): devDependencies, prisma, tsx, @types/compression, @types/cors, @types/express, @types/jsonwebtoken, @types/node (+13 more)

### Community 22 - "routes/locations.ts"
Cohesion: 0.15
Nodes (15): supabase, asyncHandler(), AsyncRouteHandler, Express, Request, requireAuth(), validate(), chatRouter (+7 more)

### Community 23 - "DashboardPage.tsx"
Cohesion: 0.14
Nodes (20): listProjects(), ProjectResponse, formatRelativeDate(), PortfolioStats, projectRoute(), ProjectCard(), PageContainer(), PageContainerProps (+12 more)

### Community 24 - "dependencies"
Cohesion: 0.11
Nodes (19): @aws-sdk/client-s3, @aws-sdk/s3-request-presigner, dependencies, @aws-sdk/client-s3, @aws-sdk/s3-request-presigner, cors, dotenv, dotenv-expand (+11 more)

### Community 25 - "WorkbenchPage.tsx"
Cohesion: 0.14
Nodes (14): saveLayoutPreferences(), IrradianceGlowProps, MONTH_LABELS, MONTHLY_AZIMUTH, MONTHLY_IRRADIANCE, useCanvasZoom(), useIrradiance(), BatchRecomputeStatus (+6 more)

### Community 26 - "locationService.ts"
Cohesion: 0.14
Nodes (24): loadGeoTIFFWithFallback(), loadReferenceGeoTransform(), loadRoofMask(), RoofMaskResult, uniquePaths(), getLocationDataForUser(), getLocationDataResponseForUser(), getLocationStatusForUser() (+16 more)

### Community 27 - "api/projects.ts"
Cohesion: 0.14
Nodes (16): apiFetch(), probeLocation(), recomputeFlux(), recomputeFluxBatch(), resolveLocation(), deleteProject(), PdfExportToken, ProjectAnalysisConfig (+8 more)

### Community 28 - "useAuth"
Cohesion: 0.11
Nodes (24): getQuota(), AppNav(), useBreadcrumbs(), ProtectedRoute(), Notification, NotificationPopover(), useNotifications(), BASE_STYLE (+16 more)

### Community 29 - "fluxRecomputeService.test.ts"
Cohesion: 0.09
Nodes (19): BuildingInsightsDto, buildingInsightsSchema, latLngSchema, PanelSpecs, parsePanelSpecs(), solarPanelSchema, solarPotentialSchema, validateFluxLocation() (+11 more)

### Community 30 - "chat/index.ts"
Cohesion: 0.13
Nodes (22): ClientMode, getGenAIClient(), invalidateForAuthFailure(), categoriseError(), ChatLanguage, ErrorCategory, getErrorCode(), localiseErrorMessage() (+14 more)

### Community 31 - "shared/index.ts"
Cohesion: 0.19
Nodes (15): LocationDataRouteResponse, LocationDataWithGeoTransform, FluxRecomputeBatchRequest, FluxRecomputeBatchResponse, FluxRecomputeRequest, FluxRecomputeResponse, LocationDataResponse, LocationStatus (+7 more)

### Community 32 - "projectDtos.ts"
Cohesion: 0.11
Nodes (18): ChatLiveState, ChatRequest, liveStateSchema, layoutPreferencesSchema, panelEditSchema, PanelModel, AnalysisConfigDto, analysisConfigSchema (+10 more)

### Community 33 - "components.json"
Cohesion: 0.12
Nodes (16): aliases, components, hooks, lib, ui, utils, rsc, $schema (+8 more)

### Community 34 - "LandingPage.tsx"
Cohesion: 0.08
Nodes (19): AppFooter(), AppLayoutProps, AppSidebar(), AppSidebarProps, NAV_SECTIONS, NavItem, NavSectionDef, Logo() (+11 more)

### Community 35 - "useChat.ts"
Cohesion: 0.27
Nodes (12): buildAuthHeaders(), buildHistory(), ChatEvent, ChatPage, drainSseBuffer(), hasLiveState(), normaliseLanguage(), parseSseEventBlock() (+4 more)

### Community 36 - "compilerOptions"
Cohesion: 0.12
Nodes (16): api/**/*.ts, ES2022, compilerOptions, allowSyntheticDefaultImports, esModuleInterop, isolatedModules, lib, module (+8 more)

### Community 37 - "ChatPanel.tsx"
Cohesion: 0.23
Nodes (9): ChatPanel(), ChatPanelProps, getPaybackYears(), ChatMessage, MessageBubble(), MessageBubbleProps, samplePool(), SuggestedQuestions() (+1 more)

### Community 38 - "useLocale.tsx"
Cohesion: 0.16
Nodes (14): ApiError, AuthProvider(), LocaleContext, LocaleContextValue, LocaleProvider(), readInitialLocale(), isSupportedLocale(), LOCALE_LABELS (+6 more)

### Community 39 - "button.tsx"
Cohesion: 0.27
Nodes (9): GoogleSignInButton(), GoogleSignInButtonProps, Crumb, LanguageToggle(), ThemeToggle(), Button, ButtonProps, buttonVariants (+1 more)

### Community 41 - "PrintReport.tsx"
Cohesion: 0.18
Nodes (13): getProjectForPdf(), getTariffConfig(), FooterProps, HeaderProps, PdfFixedFooter(), PdfFixedHeader(), PrintReport(), PrintReportProps (+5 more)

### Community 42 - "shared/package.json"
Cohesion: 0.13
Nodes (14): devDependencies, typescript, exports, typescript, license, main, name, private (+6 more)

### Community 43 - "src/errors.ts"
Cohesion: 0.22
Nodes (6): prisma, AppError, BadRequestError, ForbiddenError, NotFoundError, tariffRouter

### Community 44 - "SignInPage.test.tsx"
Cohesion: 0.29
Nodes (4): SignInPage(), navigateMock, signInMock, useAuthMock

### Community 45 - "app.ts"
Cohesion: 0.14
Nodes (13): allowedOrigins, app, __dirname, __dirname, env, envSchema, parsed, r2 (+5 more)

### Community 46 - "routes/projects.ts"
Cohesion: 0.11
Nodes (20): hits, pdfTokenRateLimit(), Express, extractToken(), Request, requirePdfToken(), InvalidPdfTokenError, PdfTokenPayload (+12 more)

### Community 48 - "layoutPreset.ts"
Cohesion: 0.22
Nodes (11): billRangeToAnnualKwh(), describeLayoutPreset(), filterByDirection(), inferVisibleCount(), PanelYieldEntry, RoofSegmentEntry, SIZING_GOAL_OFFSET, panels() (+3 more)

### Community 51 - "backend/tsconfig.json"
Cohesion: 0.17
Nodes (11): compilerOptions, outDir, rootDir, exclude, extends, include, src/**/*.test.ts, src/**/*.ts (+3 more)

### Community 53 - "dependencies"
Cohesion: 0.18
Nodes (11): class-variance-authority, @dnd-kit/sortable, dependencies, class-variance-authority, @dnd-kit/sortable, i18next-browser-languagedetector, react-markdown, @tanstack/react-query (+3 more)

### Community 55 - "projectStatus.ts"
Cohesion: 0.33
Nodes (9): BadgeVariant, getProjectStatusConfig(), getProjectStatusLabel(), getProjectStatusTooltip(), getProjectStatusVariant(), STATUS_CONFIGS, StatusConfig, ALL_STATUSES (+1 more)

### Community 56 - "costModel.ts"
Cohesion: 0.25
Nodes (9): computeSystemCost(), CostInputs, costModelDefaults, electricalBosCost(), InverterSku, permitCost(), scaffoldingCost(), selectInverter() (+1 more)

### Community 57 - "userService.ts"
Cohesion: 0.42
Nodes (7): checkQuota(), { count, single, eq, select, from }, countProjectsSinceUtcMidnight(), getQuotaSummary(), getUserTier(), nextUtcMidnight(), startOfUtcDay()

### Community 58 - "overlayService.ts"
Cohesion: 0.18
Nodes (15): geotiff, ColorStop, dsmStops, fluxStops, getOrGenerateOverlay(), getStopsForType(), lerpColor(), maskStops (+7 more)

### Community 60 - "useOverlayImages.ts"
Cohesion: 0.31
Nodes (7): getOverlayUrl(), CanvasLegends(), CanvasLegendsProps, SegmentHull, OverlayMode, useLoadedImage(), useOverlayImages()

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
Cohesion: 0.26
Nodes (11): convertRgbTiffToPng(), toArrayBuffer(), DownloadedLayer, persistLocationPipelineFailure(), persistLocationPipelineSuccess(), serializeJsonValue(), runLocationPipeline(), StoredLocationAssets (+3 more)

### Community 67 - "streamChat.test.ts"
Cohesion: 0.29
Nodes (4): LoadedStreamChatModule, loadStreamChat(), makeProject(), TEST_ENV

### Community 68 - "eslint.config.js"
Cohesion: 0.32
Nodes (7): globals, isOff(), prettier, reactHooks, tseslint, typescriptFiles, warnings()

### Community 70 - "backend/package.json"
Cohesion: 0.17
Nodes (11): license, name, prisma, seed, private, scripts, build, dev (+3 more)

### Community 71 - "locationPipeline.test.ts"
Cohesion: 0.29
Nodes (6): calculateRadiusMock, enrichBuildingInsightsMock, fetchBuildingInsightsMock, fetchDataLayersMock, parseBuildingInsightsMock, VALID_BI

### Community 72 - "SortableCardContainer.tsx"
Cohesion: 0.43
Nodes (5): CardItem, loadOrder(), reconcile(), saveOrder(), SortableCardContainer()

### Community 74 - "GuidedTour.tsx"
Cohesion: 0.38
Nodes (5): getModalPosition(), GuidedTour(), GuidedTourModal(), TourStep, getWorkbenchTourSteps()

### Community 76 - "DashboardPage.test.tsx"
Cohesion: 0.33
Nodes (4): listProjectsMock, navigateMock, useAuthMock, useQuotaMock

### Community 78 - "api/pdf-export.ts"
Cohesion: 0.33
Nodes (5): maxDuration, memory, functions, api/pdf-export.ts, $schema

### Community 80 - "WorkbenchHintOverlay.tsx"
Cohesion: 0.60
Nodes (4): Props, readPermanentDismiss(), WorkbenchHintOverlay(), writePermanentDismiss()

## Knowledge Gaps
- **572 isolated node(s):** `name`, `private`, `license`, `type`, `dev` (+567 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **46 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `dependencies` connect `dependencies` to `backend/package.json`, `express`, `jsonwebtoken`, `proj4`, `@shared/types`, `zod`, `compression`, `overlayService.ts`?**
  _High betweenness centrality (0.064) - this node is a cross-community bridge._
- **Why does `geotiff` connect `overlayService.ts` to `dependencies`, `fluxRecomputeService.ts`, `locationService.ts`, `locationPipeline.ts`?**
  _High betweenness centrality (0.064) - this node is a cross-community bridge._
- **Why does `loadFluxData()` connect `fluxRecomputeService.ts` to `overlayService.ts`?**
  _High betweenness centrality (0.051) - this node is a cross-community bridge._
- **What connects `name`, `private`, `license` to the rest of the system?**
  _572 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `AnalysisPage.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.05026419184392359 - nodes in this community are weakly interconnected._
- **Should `useCanvasInteractions.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.07578084997439836 - nodes in this community are weakly interconnected._
- **Should `scripts` be split into smaller, more focused modules?**
  _Cohesion score 0.043478260869565216 - nodes in this community are weakly interconnected._