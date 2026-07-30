# Graph Report - .  (2026-07-30)

## Corpus Check
- cluster-only mode — file stats not available

## Summary
- 1676 nodes · 3722 edges · 126 communities (80 shown, 46 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS · INFERRED: 8 edges (avg confidence: 0.76)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `3ac75a5c`
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
- chat/errors.ts
- backend/package.json
- better-auth
- SortableCardContainer.tsx
- AppErrorBoundary
- useAnalysisForm.ts
- AnalyticsPage.tsx
- DashboardPage.test.tsx
- buildingInsights.ts
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
- `buildPdfAnalysisViewModel()` --calls--> `computeSystemCost()`  [EXTRACTED]
  frontend/src/components/pdf/analysis/pdfAnalysisViewModel.ts → shared/costModel.ts
- `buildPdfAnalysisViewModel()` --calls--> `getPanelModel()`  [EXTRACTED]
  frontend/src/components/pdf/analysis/pdfAnalysisViewModel.ts → shared/panelModels.ts
- `useAnalysisForm()` --calls--> `computeSystemCost()`  [EXTRACTED]
  frontend/src/hooks/useAnalysisForm.ts → shared/costModel.ts
- `useAnalysisForm()` --calls--> `getPanelModel()`  [EXTRACTED]
  frontend/src/hooks/useAnalysisForm.ts → shared/panelModels.ts

## Import Cycles
- None detected.

## Communities (126 total, 46 thin omitted)

### Community 0 - "card.tsx"
Cohesion: 0.19
Nodes (19): BillBreakdownProps, SimulationMonth, BillComparisonChartProps, FinancialRoadmapProps, Milestone, MonthTableProps, SystemMetaCardProps, SystemAssumptionsProps (+11 more)

### Community 1 - "useCanvasInteractions.ts"
Cohesion: 0.06
Nodes (60): PdfPageShell(), Props, PrintPage1Workbench(), Props, MODEL_CELL_COLORS, ModelCard(), PanelModelDrawer(), PanelModelDrawerProps (+52 more)

### Community 2 - "fluxRecomputeService.ts"
Cohesion: 0.18
Nodes (19): calculateAverageFlux(), computeMonthlyEnergy(), computeMonthlyEnergyFromRasters(), pointInPolygon(), PreloadedFluxRasters, preloadFluxRasters(), getRotatedCorners(), rotatePoint() (+11 more)

### Community 3 - "scripts"
Cohesion: 0.04
Nodes (45): concurrently, eslint, @eslint/js, eslint-plugin-react-hooks, globals, dependencies, @prisma/client, devDependencies (+37 more)

### Community 4 - "useChat.ts"
Cohesion: 0.09
Nodes (27): ChatLauncher(), ChatLauncherProps, ChatPanel(), ChatPanelProps, getPaybackYears(), ChatContext, ChatContextValue, ChatMessage (+19 more)

### Community 5 - "devDependencies"
Cohesion: 0.05
Nodes (36): autoprefixer, devDependencies, autoprefixer, jsdom, tailwindcss, @tailwindcss/vite, @testing-library/react, @types/google.maps (+28 more)

### Community 6 - "solarApiService.ts"
Cohesion: 0.11
Nodes (29): downloadLayer(), fetchLocationPipelineInputs(), getLayerUrl(), LAYER_FILENAMES, PipelineFetchResult, SolarLayerKey, buildSolarParams(), calculateRadius() (+21 more)

### Community 7 - "CanvasControls.tsx"
Cohesion: 0.16
Nodes (17): CanvasControls(), CanvasControlsProps, CollapseIcon(), DeleteIcon(), ExpandIcon(), LayersIcon(), MarqueeIcon(), RedoIcon() (+9 more)

### Community 8 - "usePanelState.ts"
Cohesion: 0.07
Nodes (35): GroupPanel, GroupRotationHandle(), GroupRotationHandleProps, getPanelColorByRatio(), panelAnnualEnergy(), PanelLayer(), PanelLayerProps, RenderPanel (+27 more)

### Community 9 - "projectService.ts"
Cohesion: 0.12
Nodes (30): ImageGeoTransform, createProject(), findOwnedProject(), getPdfProjectData(), getProject(), listProjects(), saveAnalysis(), saveLayout() (+22 more)

### Community 10 - "DashboardPage.tsx"
Cohesion: 0.12
Nodes (26): formatDisplay(), TARIFF_FIELDS, TariffField, TariffParameterModal(), TariffParameterModalProps, CoverageNoticeModal(), Props, writeCoverageNoticeDismissed() (+18 more)

### Community 11 - "analysis.ts"
Cohesion: 0.22
Nodes (15): buildPdfAnalysisViewModel(), PdfAnalysisViewModel, AnalysisDisclaimerKey, AnalysisChartDataPoint, isSeasonalProfile(), LayoutOrientationSummary, summarizeLayoutOrientation(), buildNetBenefitSeries() (+7 more)

### Community 12 - "TariffControls.tsx"
Cohesion: 0.17
Nodes (13): LifecycleControlsProps, TariffControlsProps, DropdownMenu(), DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuRadioItem (+5 more)

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
Cohesion: 0.16
Nodes (23): bucketByOrientation(), ChatPage, ChatProject, countActivePanels(), countSegmentsUsed(), describeInverterReplacements(), formatMaybeNumber(), formatNumber() (+15 more)

### Community 17 - "compilerOptions"
Cohesion: 0.08
Nodes (23): compilerOptions, jsx, lib, noEmit, paths, rootDir, types, exclude (+15 more)

### Community 18 - "MapPage.tsx"
Cohesion: 0.15
Nodes (18): ApiError, getLocationStatus(), createProject(), readCoverageNoticeDismissed(), LowerResolutionConsentModal(), ManualCoordinateModal(), ensureLoaded(), loader (+10 more)

### Community 19 - "env.ts"
Cohesion: 0.14
Nodes (24): __dirname, env, envSchema, parsed, escapeHtml(), renderEmailChangeEmail(), escapeHtml(), renderInviteEmail() (+16 more)

### Community 20 - "cn"
Cohesion: 0.11
Nodes (20): PageContainer(), PageContainerProps, VARIANTS, PageHeaderCard(), PageHeaderCardProps, Badge(), BadgeProps, badgeVariants (+12 more)

### Community 21 - "devDependencies"
Cohesion: 0.10
Nodes (21): devDependencies, prisma, tsx, @types/compression, @types/cors, @types/express, @types/jsonwebtoken, @types/node (+13 more)

### Community 22 - "routes/locations.ts"
Cohesion: 0.16
Nodes (15): auth, asyncHandler(), AsyncRouteHandler, Express, Request, requireAuth(), validate(), chatRouter (+7 more)

### Community 23 - "ProjectsPage.tsx"
Cohesion: 0.14
Nodes (18): listProjects(), ProjectResponse, getQuota(), formatRelativeDate(), PortfolioStats, projectRoute(), ProjectCard(), formatReset() (+10 more)

### Community 24 - "dependencies"
Cohesion: 0.11
Nodes (19): @aws-sdk/client-s3, @aws-sdk/s3-request-presigner, dependencies, @aws-sdk/client-s3, @aws-sdk/s3-request-presigner, cors, dotenv, jsonwebtoken (+11 more)

### Community 25 - "WorkbenchPage.tsx"
Cohesion: 0.07
Nodes (29): AppLayout(), getModalPosition(), GuidedTour(), GuidedTourModal(), TourStep, DEFAULT_HINTS, LoadingOverlay(), CanvasLegends() (+21 more)

### Community 26 - "locationService.ts"
Cohesion: 0.13
Nodes (25): parseBuildingInsights(), loadGeoTIFFWithFallback(), loadReferenceGeoTransform(), loadRoofMask(), RoofMaskResult, uniquePaths(), getLocationDataForUser(), getLocationDataResponseForUser() (+17 more)

### Community 27 - "api/projects.ts"
Cohesion: 0.20
Nodes (12): getLocationData(), LocationImageGeoTransform, getProject(), PdfExportToken, ProjectAnalysisConfig, decodeBase64(), DecodedRoofMask, useWorkbenchData() (+4 more)

### Community 28 - "toastConfig.tsx"
Cohesion: 0.17
Nodes (12): Notification, NotificationPopover(), useNotifications(), BASE_STYLE, baseOptions, notify, emit(), Listener (+4 more)

### Community 29 - "fluxRecomputeService.test.ts"
Cohesion: 0.09
Nodes (19): BuildingInsightsDto, buildingInsightsSchema, latLngSchema, PanelSpecs, parsePanelSpecs(), solarPanelSchema, solarPotentialSchema, validateFluxLocation() (+11 more)

### Community 30 - "chat/index.ts"
Cohesion: 0.18
Nodes (13): ClientMode, getGenAIClient(), invalidateForAuthFailure(), GuardResult, PATTERNS, validateChatInput(), buildContents(), ChatEvent (+5 more)

### Community 31 - "api/locations.ts"
Cohesion: 0.11
Nodes (24): LocationDataRouteResponse, apiFetch(), getOverlayUrl(), LocationDataWithGeoTransform, probeLocation(), recomputeFlux(), recomputeFluxBatch(), resolveLocation() (+16 more)

### Community 32 - "shared/index.ts"
Cohesion: 0.08
Nodes (39): ChatLiveState, ChatRequest, liveStateSchema, filterByDirection(), PanelYieldEntry, RoofSegmentEntry, SIZING_GOAL_OFFSET, azimuthMatchesRoofDirection() (+31 more)

### Community 33 - "components.json"
Cohesion: 0.12
Nodes (16): aliases, components, hooks, lib, ui, utils, rsc, $schema (+8 more)

### Community 34 - "LandingPage.tsx"
Cohesion: 0.08
Nodes (19): AppFooter(), AppLayoutProps, AppSidebar(), AppSidebarProps, NAV_SECTIONS, NavItem, NavSectionDef, Logo() (+11 more)

### Community 35 - "AnalysisPage.tsx"
Cohesion: 0.18
Nodes (22): saveAnalysis(), BillComparisonChart(), FinancialRoadmap(), MonthTable(), NetBenefitChart(), NetBenefitChartProps, YEAR_RANGES, YearRange (+14 more)

### Community 36 - "compilerOptions"
Cohesion: 0.12
Nodes (16): api/**/*.ts, ES2022, compilerOptions, allowSyntheticDefaultImports, esModuleInterop, isolatedModules, lib, module (+8 more)

### Community 37 - "SystemCostCard.tsx"
Cohesion: 0.13
Nodes (17): ChartTooltipContent(), ChartTooltipContentProps, TooltipEntry, Segment, SEGMENT_COLORS, SystemCostCardProps, SummaryCard(), SummaryTile() (+9 more)

### Community 38 - "useAuth.tsx"
Cohesion: 0.11
Nodes (22): App(), AuthProbe(), { notifyErrorMock, signInEmailMock, signInSocialMock, signOutMock, signUpEmailMock, useSessionMock }, SessionState, AuthContext, AuthContextValue, AuthError, AuthProvider() (+14 more)

### Community 39 - "button.tsx"
Cohesion: 0.12
Nodes (18): GoogleSignInButton(), GoogleSignInButtonProps, AppNav(), Crumb, useBreadcrumbs(), LanguageToggle(), ThemeToggle(), Button (+10 more)

### Community 40 - "WorkbenchSidebar.tsx"
Cohesion: 0.13
Nodes (14): BillBreakdown(), getRoiCondition(), RoiCondition, SystemMetaCard(), SolarVerdict(), SolarVerdictProps, Slider, SelectedPanelData (+6 more)

### Community 41 - "PrintReport.tsx"
Cohesion: 0.18
Nodes (13): getProjectForPdf(), getTariffConfig(), FooterProps, HeaderProps, PdfFixedFooter(), PdfFixedHeader(), PrintReport(), PrintReportProps (+5 more)

### Community 42 - "shared/package.json"
Cohesion: 0.13
Nodes (14): devDependencies, typescript, exports, typescript, license, main, name, private (+6 more)

### Community 43 - "src/errors.ts"
Cohesion: 0.21
Nodes (6): prisma, AppError, BadRequestError, ForbiddenError, NotFoundError, tariffRouter

### Community 44 - "App.tsx"
Cohesion: 0.13
Nodes (14): AnalysisPage, AnalyticsPage, DashboardPage, FAQPage, MapPage, NotFoundPage, PAGE_LOADING_HINTS, PdfPreviewPage (+6 more)

### Community 45 - "app.ts"
Cohesion: 0.21
Nodes (8): allowedOrigins, app, __dirname, errorHandler(), requestLogger(), healthRouter, projectsRouter, HealthResponse

### Community 46 - "routes/projects.ts"
Cohesion: 0.11
Nodes (20): hits, pdfTokenRateLimit(), Express, extractToken(), Request, requirePdfToken(), InvalidPdfTokenError, PdfTokenPayload (+12 more)

### Community 48 - "WorkbenchPage"
Cohesion: 0.24
Nodes (8): saveLayoutPreferences(), billRangeToAnnualKwh(), describeLayoutPreset(), inferVisibleCount(), panels(), markProjectVisited(), getPanelAnnualEnergy(), WorkbenchPage()

### Community 49 - "config.ts"
Cohesion: 0.22
Nodes (15): AnalysisConfig, AnalysisMode, ConnectionPhase, DEFAULT_INVERTER_REPLACEMENT, getConnectionPhase(), getConsumptionProfile(), getNumber(), getRoofType() (+7 more)

### Community 51 - "backend/tsconfig.json"
Cohesion: 0.17
Nodes (11): compilerOptions, outDir, rootDir, exclude, extends, include, src/**/*.test.ts, src/**/*.ts (+3 more)

### Community 53 - "dependencies"
Cohesion: 0.18
Nodes (11): class-variance-authority, clsx, dependencies, class-variance-authority, clsx, proj4, react-markdown, @tanstack/react-query (+3 more)

### Community 54 - "prompt.ts"
Cohesion: 0.20
Nodes (13): __dirname, KNOWLEDGE_PATH, loadKnowledgeBible(), parseSections(), renderKnowledgeForPrompt(), buildSystemInstruction(), ChatLanguage, ChatPage (+5 more)

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
Cohesion: 0.21
Nodes (13): r2, ColorStop, dsmStops, fluxStops, getOrGenerateOverlay(), getStopsForType(), lerpColor(), maskStops (+5 more)

### Community 60 - "useTheme.tsx"
Cohesion: 0.22
Nodes (10): buildPdfFileName(), sanitizeFileName(), useAnalysisPdf(), useLocale(), getSystemTheme(), resolveTheme(), Theme, ThemeContext (+2 more)

### Community 61 - "results.ts"
Cohesion: 0.28
Nodes (11): buildAnalysisResults(), classifyNemFit(), computeLifecyclePaybackYears(), computeNemFitMetrics(), computeSimplePaybackYears(), round2(), AnnualSimulationResult, NemMonthResult (+3 more)

### Community 62 - "billingEngine.ts"
Cohesion: 0.33
Nodes (11): BillBreakdown, BillingConfig, computeBill(), computeNemMonth(), lookupEeiRebate(), round2(), round5sen(), runAnnualSimulation() (+3 more)

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
Cohesion: 0.21
Nodes (13): geotiff, convertRgbTiffToPng(), toArrayBuffer(), DownloadedLayer, persistLocationPipelineFailure(), persistLocationPipelineSuccess(), serializeJsonValue(), runLocationPipeline() (+5 more)

### Community 67 - "streamChat.test.ts"
Cohesion: 0.29
Nodes (4): LoadedStreamChatModule, loadStreamChat(), makeProject(), TEST_ENV

### Community 68 - "eslint.config.js"
Cohesion: 0.32
Nodes (7): globals, isOff(), prettier, reactHooks, tseslint, typescriptFiles, warnings()

### Community 69 - "chat/errors.ts"
Cohesion: 0.31
Nodes (9): categoriseError(), ChatLanguage, ErrorCategory, getErrorCode(), localiseErrorMessage(), redactErrorMessage(), generateWithRetry(), isRetryable() (+1 more)

### Community 70 - "backend/package.json"
Cohesion: 0.29
Nodes (6): license, name, prisma, seed, private, type

### Community 72 - "SortableCardContainer.tsx"
Cohesion: 0.43
Nodes (5): CardItem, loadOrder(), reconcile(), saveOrder(), SortableCardContainer()

### Community 74 - "useAnalysisForm.ts"
Cohesion: 0.40
Nodes (9): ChartDataPoint, useAnalysisForm(), aggregateMonthlyGeneration(), applyPerformanceRatio(), applySeasonalProfile(), buildMonthlyBillChartData(), COMPASS_8, round2() (+1 more)

### Community 75 - "AnalyticsPage.tsx"
Cohesion: 0.22
Nodes (6): aggregatePortfolio(), StatCard(), ComparisonMetric, METRIC_FORMATTERS, listProjectsMock, navigateMock

### Community 76 - "DashboardPage.test.tsx"
Cohesion: 0.33
Nodes (4): listProjectsMock, navigateMock, useAuthMock, useQuotaMock

### Community 77 - "buildingInsights.ts"
Cohesion: 0.58
Nodes (8): BoundingBox, getCoordinate(), getNumber(), getPanelCenter(), getString(), isRecord(), parseBuildingInsights(), parsePanelEdits()

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
- **582 isolated node(s):** `name`, `private`, `license`, `type`, `dev` (+577 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **46 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `geotiff` connect `locationPipeline.ts` to `dependencies`, `fluxRecomputeService.ts`, `locationService.ts`, `overlayService.ts`?**
  _High betweenness centrality (0.069) - this node is a cross-community bridge._
- **Why does `dependencies` connect `dependencies` to `locationPipeline.ts`, `backend/package.json`, `express`, `proj4`, `@shared/types`, `better-auth`, `dotenv-expand`, `@google/genai`, `compression`?**
  _High betweenness centrality (0.067) - this node is a cross-community bridge._
- **Why does `loadFluxData()` connect `fluxRecomputeService.ts` to `locationPipeline.ts`, `overlayService.ts`?**
  _High betweenness centrality (0.054) - this node is a cross-community bridge._
- **What connects `name`, `private`, `license` to the rest of the system?**
  _582 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `useCanvasInteractions.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.06338028169014084 - nodes in this community are weakly interconnected._
- **Should `scripts` be split into smaller, more focused modules?**
  _Cohesion score 0.043478260869565216 - nodes in this community are weakly interconnected._
- **Should `useChat.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.08780487804878048 - nodes in this community are weakly interconnected._