# Graph Report - solar-layout-generator  (2026-08-25)

## Corpus Check
- 330 files · ~159,607 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 1697 nodes · 3788 edges · 128 communities (82 shown, 46 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS · INFERRED: 8 edges (avg confidence: 0.76)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `51f675cc`
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
- src/errors.ts
- backend/package.json
- routes/locations.ts
- SortableCardContainer.tsx
- AppErrorBoundary
- useAnalysisForm.ts
- AnalyticsPage.tsx
- streamChat.test.ts
- SystemCostCard.tsx
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
- ProjectsPage.test.tsx
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
- SignInPage.test.tsx
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

## Communities (128 total, 46 thin omitted)

### Community 0 - "card.tsx"
Cohesion: 0.17
Nodes (16): FinancialRoadmapProps, Milestone, MonthTableProps, getRoiCondition(), RoiCondition, SystemMetaCardProps, SolarVerdictProps, SystemAssumptionsProps (+8 more)

### Community 1 - "useCanvasInteractions.ts"
Cohesion: 0.08
Nodes (52): LocationImageGeoTransform, PdfPageShell(), Props, PrintPage1Workbench(), Props, useCanvasInteractions(), UseCanvasInteractionsOptions, aabbsOverlap() (+44 more)

### Community 2 - "fluxRecomputeService.ts"
Cohesion: 0.07
Nodes (38): calculateAverageFlux(), computeMonthlyEnergy(), computeMonthlyEnergyFromRasters(), pointInPolygon(), PreloadedFluxRasters, preloadFluxRasters(), getRotatedCorners(), rotatePoint() (+30 more)

### Community 3 - "scripts"
Cohesion: 0.04
Nodes (45): concurrently, eslint, @eslint/js, eslint-plugin-react-hooks, globals, dependencies, @prisma/client, devDependencies (+37 more)

### Community 4 - "useChat.ts"
Cohesion: 0.09
Nodes (28): ChatLauncher(), ChatLauncherProps, ChatPanel(), ChatPanelProps, getPaybackYears(), ChatContext, ChatContextValue, ChatMessage (+20 more)

### Community 5 - "devDependencies"
Cohesion: 0.05
Nodes (36): autoprefixer, devDependencies, autoprefixer, jsdom, tailwindcss, @tailwindcss/vite, @testing-library/react, @types/google.maps (+28 more)

### Community 6 - "solarApiService.ts"
Cohesion: 0.11
Nodes (28): downloadLayer(), fetchLocationPipelineInputs(), getLayerUrl(), LAYER_FILENAMES, PipelineFetchResult, SolarLayerKey, buildSolarParams(), calculateRadius() (+20 more)

### Community 7 - "CanvasControls.tsx"
Cohesion: 0.18
Nodes (16): CanvasControlsProps, CollapseIcon(), DeleteIcon(), ExpandIcon(), LayersIcon(), MarqueeIcon(), RedoIcon(), RotateIcon() (+8 more)

### Community 8 - "usePanelState.ts"
Cohesion: 0.05
Nodes (93): buildPdfAnalysisViewModel(), PdfAnalysisViewModel, roofSegments, solarPanels, roofSegments, setup(), solarPanels, ChartDataPoint (+85 more)

### Community 9 - "projectService.ts"
Cohesion: 0.12
Nodes (34): createProject(), deleteProject(), findOwnedProject(), getPdfProjectData(), getProject(), listProjects(), saveAnalysis(), saveLayout() (+26 more)

### Community 10 - "DashboardPage.tsx"
Cohesion: 0.12
Nodes (24): formatDisplay(), TARIFF_FIELDS, TariffField, TariffParameterModal(), TariffParameterModalProps, CoverageNoticeModal(), Props, writeCoverageNoticeDismissed() (+16 more)

### Community 11 - "analysis.ts"
Cohesion: 0.14
Nodes (12): AppFooter(), AppLayoutProps, AppSidebar(), AppSidebarProps, NAV_SECTIONS, NavItem, NavSectionDef, Logo() (+4 more)

### Community 12 - "TariffControls.tsx"
Cohesion: 0.11
Nodes (23): AnalysisSidebar(), AnalysisSidebarProps, ConsumptionControls(), ConsumptionControlsProps, LifecycleControls(), LifecycleControlsProps, TariffControls(), TariffControlsProps (+15 more)

### Community 13 - "pdf-service/package.json"
Cohesion: 0.07
Nodes (27): puppeteer-core, dependencies, puppeteer-core, @sparticuz/chromium, zod, description, devDependencies, @types/node (+19 more)

### Community 14 - "AnalysisSidebar.tsx"
Cohesion: 0.22
Nodes (12): prisma, convertRgbTiffToPng(), toArrayBuffer(), DownloadedLayer, persistLocationPipelineFailure(), persistLocationPipelineSuccess(), serializeJsonValue(), runLocationPipeline() (+4 more)

### Community 15 - "compilerOptions"
Cohesion: 0.08
Nodes (24): dist, node_modules, compilerOptions, allowImportingTsExtensions, declaration, declarationMap, esModuleInterop, forceConsistentCasingInFileNames (+16 more)

### Community 16 - "digest.ts"
Cohesion: 0.16
Nodes (23): bucketByOrientation(), ChatPage, ChatProject, countActivePanels(), countSegmentsUsed(), describeInverterReplacements(), formatMaybeNumber(), formatNumber() (+15 more)

### Community 17 - "compilerOptions"
Cohesion: 0.08
Nodes (23): compilerOptions, jsx, lib, noEmit, paths, rootDir, types, exclude (+15 more)

### Community 18 - "MapPage.tsx"
Cohesion: 0.08
Nodes (31): getLocationStatus(), createProject(), readCoverageNoticeDismissed(), LowerResolutionConsentModal(), ManualCoordinateModal(), DEFAULT_HINTS, LoadingOverlay(), ensureLoaded() (+23 more)

### Community 19 - "env.ts"
Cohesion: 0.14
Nodes (29): __dirname, env, envSchema, parsed, EmailCopy, escapeHtml(), renderEmailChangeEmail(), escapeHtml() (+21 more)

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
Cohesion: 0.13
Nodes (24): listProjects(), ProjectResponse, formatRelativeDate(), PortfolioStats, projectRoute(), ProjectCard(), PageContainer(), PageContainerProps (+16 more)

### Community 24 - "dependencies"
Cohesion: 0.11
Nodes (19): @aws-sdk/client-s3, @aws-sdk/s3-request-presigner, dependencies, @aws-sdk/client-s3, @aws-sdk/s3-request-presigner, cors, dotenv, jsonwebtoken (+11 more)

### Community 25 - "WorkbenchPage.tsx"
Cohesion: 0.09
Nodes (22): getModalPosition(), GuidedTour(), GuidedTourModal(), TourStep, CanvasLegends(), CanvasLegendsProps, SegmentHull, IrradianceGlowProps (+14 more)

### Community 26 - "locationService.ts"
Cohesion: 0.16
Nodes (20): parseBuildingInsights(), getLocationDataForUser(), getLocationDataResponseForUser(), getLocationStatusForUser(), getLocationStatusResponseForUser(), getOverlayResponseForUser(), linkOwnedProjectToLocation(), probeLocation() (+12 more)

### Community 27 - "api/projects.ts"
Cohesion: 0.19
Nodes (12): getLocationData(), getProject(), PdfExportToken, ProjectAnalysisConfig, decodeBase64(), DecodedRoofMask, useWorkbenchData(), CreateProjectRequest (+4 more)

### Community 28 - "toastConfig.tsx"
Cohesion: 0.15
Nodes (14): Notification, NotificationPopover(), useNotifications(), BASE_STYLE, baseOptions, emit(), Listener, listeners (+6 more)

### Community 29 - "fluxRecomputeService.test.ts"
Cohesion: 0.18
Nodes (14): __dirname, KNOWLEDGE_PATH, loadKnowledgeBible(), parseSections(), renderKnowledgeForPrompt(), buildSystemInstruction(), ChatLanguage, ChatPage (+6 more)

### Community 30 - "chat/index.ts"
Cohesion: 0.18
Nodes (13): ClientMode, getGenAIClient(), invalidateForAuthFailure(), GuardResult, PATTERNS, validateChatInput(), buildContents(), ChatEvent (+5 more)

### Community 31 - "api/locations.ts"
Cohesion: 0.11
Nodes (24): LocationDataRouteResponse, apiFetch(), getOverlayUrl(), LocationDataWithGeoTransform, probeLocation(), recomputeFlux(), recomputeFluxBatch(), resolveLocation() (+16 more)

### Community 32 - "shared/index.ts"
Cohesion: 0.12
Nodes (27): ChatRequest, liveStateSchema, LocationStatus, BILL_RANGE_TO_KWH_PER_MONTH, BillRange, billRangeSchema, LayoutPreferences, layoutPreferencesPartialSchema (+19 more)

### Community 33 - "components.json"
Cohesion: 0.12
Nodes (16): aliases, components, hooks, lib, ui, utils, rsc, $schema (+8 more)

### Community 34 - "LandingPage.tsx"
Cohesion: 0.14
Nodes (7): HERO_PROFILES, HeroProfile, LandingPage(), PipelineStep, useHeroTicker(), useScrollY(), useAuthMock

### Community 35 - "AnalysisPage.tsx"
Cohesion: 0.21
Nodes (15): saveAnalysis(), BillComparisonChart(), BillComparisonChartProps, NetBenefitChart(), SystemAssumptions(), SystemCostCard(), PrintPage2Analysis(), notify (+7 more)

### Community 36 - "compilerOptions"
Cohesion: 0.12
Nodes (16): api/**/*.ts, ES2022, compilerOptions, allowSyntheticDefaultImports, esModuleInterop, isolatedModules, lib, module (+8 more)

### Community 37 - "SystemCostCard.tsx"
Cohesion: 0.19
Nodes (10): auth, asyncHandler(), AsyncRouteHandler, Express, Request, requireAuth(), chatRouter, quotaRouter (+2 more)

### Community 38 - "useAuth.tsx"
Cohesion: 0.12
Nodes (18): App(), AuthProbe(), { notifyErrorMock, signInEmailMock, signInSocialMock, signOutMock, signUpEmailMock, useSessionMock }, SessionState, AuthContext, AuthContextValue, AuthError, AuthProvider() (+10 more)

### Community 39 - "button.tsx"
Cohesion: 0.19
Nodes (12): GoogleSignInButton(), GoogleSignInButtonProps, AppNav(), Crumb, useBreadcrumbs(), LanguageToggle(), ThemeToggle(), useAuth() (+4 more)

### Community 40 - "WorkbenchSidebar.tsx"
Cohesion: 0.23
Nodes (11): BillBreakdown(), BillBreakdownProps, SimulationMonth, ChartTooltipContentProps, TooltipEntry, MonthTable(), SystemMetaCard(), SolarVerdict() (+3 more)

### Community 41 - "PrintReport.tsx"
Cohesion: 0.18
Nodes (13): getProjectForPdf(), getTariffConfig(), FooterProps, HeaderProps, PdfFixedFooter(), PdfFixedHeader(), PrintReport(), PrintReportProps (+5 more)

### Community 42 - "shared/package.json"
Cohesion: 0.13
Nodes (14): devDependencies, typescript, exports, typescript, license, main, name, private (+6 more)

### Community 43 - "src/errors.ts"
Cohesion: 0.23
Nodes (11): DropdownMenuItem, buildCurrencyFormatter(), buildNumberFormatter(), currencyFormatter, numberFormatter, setFormatterLocale(), LOCALE_LABELS, resources (+3 more)

### Community 44 - "App.tsx"
Cohesion: 0.13
Nodes (15): AnalysisPage, AnalyticsPage, DashboardPage, FAQPage, MapPage, NotFoundPage, PAGE_LOADING_HINTS, PdfPreviewPage (+7 more)

### Community 45 - "app.ts"
Cohesion: 0.13
Nodes (21): Badge(), BadgeProps, badgeVariants, InfoTooltip(), Separator, Skeleton(), Slider, TooltipContent (+13 more)

### Community 46 - "routes/projects.ts"
Cohesion: 0.22
Nodes (10): hits, pdfTokenRateLimit(), createProjectSchema, saveAnalysisSchema, saveLayoutSchema, updateLayoutPreferencesSchema, createProjectRequestSchema, saveAnalysisRequestSchema (+2 more)

### Community 48 - "WorkbenchPage"
Cohesion: 0.16
Nodes (14): saveLayoutPreferences(), billRangeToAnnualKwh(), describeLayoutPreset(), filterByDirection(), inferVisibleCount(), PanelYieldEntry, RoofSegmentEntry, SIZING_GOAL_OFFSET (+6 more)

### Community 49 - "config.ts"
Cohesion: 0.19
Nodes (9): allowedOrigins, app, __dirname, errorHandler(), requestLogger(), healthRouter, locationsRouter, projectsRouter (+1 more)

### Community 51 - "backend/tsconfig.json"
Cohesion: 0.17
Nodes (11): compilerOptions, outDir, rootDir, exclude, extends, include, src/**/*.test.ts, src/**/*.ts (+3 more)

### Community 53 - "dependencies"
Cohesion: 0.18
Nodes (11): class-variance-authority, dependencies, better-auth, class-variance-authority, proj4, react-markdown, @tanstack/react-query, better-auth (+3 more)

### Community 54 - "prompt.ts"
Cohesion: 0.19
Nodes (10): ChartTooltipContent(), NetBenefitChartProps, YEAR_RANGES, YearRange, PdfBillComparisonChart(), PdfCumulativeSavingsChart(), TooltipStyle, CHART_TOOLTIP_STYLE (+2 more)

### Community 55 - "projectStatus.ts"
Cohesion: 0.33
Nodes (9): BadgeVariant, getProjectStatusConfig(), getProjectStatusLabel(), getProjectStatusTooltip(), getProjectStatusVariant(), STATUS_CONFIGS, StatusConfig, ALL_STATUSES (+1 more)

### Community 56 - "costModel.ts"
Cohesion: 0.25
Nodes (9): computeSystemCost(), CostInputs, costModelDefaults, electricalBosCost(), InverterSku, permitCost(), scaffoldingCost(), selectInverter() (+1 more)

### Community 57 - "userService.ts"
Cohesion: 0.42
Nodes (7): checkQuota(), { count, findUnique }, countProjectsSinceUtcMidnight(), getQuotaSummary(), getUserTier(), nextUtcMidnight(), startOfUtcDay()

### Community 58 - "overlayService.ts"
Cohesion: 0.20
Nodes (12): r2, ColorStop, dsmStops, fluxStops, getOrGenerateOverlay(), getStopsForType(), lerpColor(), maskStops (+4 more)

### Community 60 - "useTheme.tsx"
Cohesion: 0.43
Nodes (6): getSystemTheme(), resolveTheme(), Theme, ThemeContext, ThemeContextValue, ThemeProvider()

### Community 61 - "results.ts"
Cohesion: 0.23
Nodes (9): FinancialRoadmap(), SummaryCard(), SummaryTile(), PdfSystemCost(), Segment, SEGMENT_COLORS, Props, ANALYSIS_DISCLAIMER_KEYS (+1 more)

### Community 62 - "billingEngine.ts"
Cohesion: 0.31
Nodes (9): categoriseError(), ChatLanguage, ErrorCategory, getErrorCode(), localiseErrorMessage(), redactErrorMessage(), generateWithRetry(), isRetryable() (+1 more)

### Community 63 - "seed.ts"
Cohesion: 0.18
Nodes (12): __dirname, EEI_TABLE, main(), prisma, RATES, THRESHOLDS, createR2Client(), DEMO_LOCATIONS (+4 more)

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

### Community 69 - "src/errors.ts"
Cohesion: 0.31
Nodes (4): AppError, BadRequestError, ForbiddenError, NotFoundError

### Community 70 - "backend/package.json"
Cohesion: 0.29
Nodes (6): license, name, prisma, seed, private, type

### Community 71 - "routes/locations.ts"
Cohesion: 0.36
Nodes (6): validate(), OverlayType, fluxRecomputeBatchSchema, fluxRecomputeSchema, probeLocationSchema, resolveLocationSchema

### Community 72 - "SortableCardContainer.tsx"
Cohesion: 0.43
Nodes (5): CardItem, loadOrder(), reconcile(), saveOrder(), SortableCardContainer()

### Community 74 - "useAnalysisForm.ts"
Cohesion: 0.22
Nodes (5): ApiError, getQuota(), QuotaSummary, TIER_DAILY_LIMITS, UserTier

### Community 75 - "AnalyticsPage.tsx"
Cohesion: 0.24
Nodes (7): aggregatePortfolio(), StatCard(), AnalyticsPage(), ComparisonMetric, METRIC_FORMATTERS, listProjectsMock, navigateMock

### Community 76 - "streamChat.test.ts"
Cohesion: 0.29
Nodes (4): LoadedStreamChatModule, loadStreamChat(), makeProject(), TEST_ENV

### Community 77 - "SystemCostCard.tsx"
Cohesion: 0.33
Nodes (5): Segment, SEGMENT_COLORS, SystemCostCardProps, CostBreakdown, RoofType

### Community 78 - "api/pdf-export.ts"
Cohesion: 0.33
Nodes (5): maxDuration, memory, functions, api/pdf-export.ts, $schema

### Community 79 - "MapPage.test.tsx"
Cohesion: 0.33
Nodes (4): listProjectsMock, navigateMock, useAuthMock, useQuotaMock

### Community 80 - "AnalysisPage.test.tsx"
Cohesion: 0.25
Nodes (6): handleExportPdfMock, markProjectVisitedMock, navigateMock, notifyErrorMock, notifySuccessMock, saveAnalysisMock

### Community 81 - "scripts"
Cohesion: 0.40
Nodes (5): scripts, build, dev, start, test

### Community 92 - "ProjectsPage.test.tsx"
Cohesion: 0.33
Nodes (4): deleteProjectMock, listProjectsMock, navigateMock, useQuotaMock

### Community 119 - "SignInPage.test.tsx"
Cohesion: 0.33
Nodes (3): navigateMock, signInMock, useAuthMock

## Knowledge Gaps
- **588 isolated node(s):** `name`, `private`, `license`, `type`, `dev` (+583 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **46 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `dependencies` connect `dependencies` to `locationPipeline.ts`, `backend/package.json`, `express`, `proj4`, `@shared/types`, `better-auth`, `dotenv-expand`, `@google/genai`, `compression`?**
  _High betweenness centrality (0.068) - this node is a cross-community bridge._
- **Why does `geotiff` connect `locationPipeline.ts` to `dependencies`, `fluxRecomputeService.ts`, `overlayService.ts`, `AnalysisSidebar.tsx`?**
  _High betweenness centrality (0.067) - this node is a cross-community bridge._
- **Why does `loadFluxData()` connect `fluxRecomputeService.ts` to `locationPipeline.ts`, `overlayService.ts`?**
  _High betweenness centrality (0.052) - this node is a cross-community bridge._
- **What connects `name`, `private`, `license` to the rest of the system?**
  _588 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `useCanvasInteractions.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.07578084997439836 - nodes in this community are weakly interconnected._
- **Should `fluxRecomputeService.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.07482993197278912 - nodes in this community are weakly interconnected._
- **Should `scripts` be split into smaller, more focused modules?**
  _Cohesion score 0.043478260869565216 - nodes in this community are weakly interconnected._