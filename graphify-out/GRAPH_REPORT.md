# Graph Report - .  (2026-07-29)

## Corpus Check
- cluster-only mode — file stats not available

## Summary
- 1630 nodes · 3624 edges · 128 communities (85 shown, 43 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS · INFERRED: 8 edges (avg confidence: 0.76)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `5c2af1aa`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- Community 0
- Community 1
- Community 2
- Community 3
- Community 4
- Community 5
- Community 6
- Community 7
- Community 8
- Community 9
- Community 10
- Community 11
- Community 12
- Community 13
- Community 14
- Community 15
- Community 16
- Community 17
- Community 18
- Community 19
- Community 20
- Community 21
- Community 22
- Community 23
- Community 24
- Community 25
- Community 26
- Community 27
- Community 28
- Community 29
- Community 30
- Community 31
- Community 32
- Community 33
- Community 34
- Community 35
- Community 36
- Community 37
- Community 38
- Community 39
- Community 40
- Community 41
- Community 42
- Community 43
- Community 44
- Community 45
- Community 46
- Community 47
- Community 48
- Community 49
- Community 50
- Community 51
- Community 52
- Community 53
- Community 54
- Community 55
- Community 56
- Community 57
- Community 58
- Community 59
- Community 60
- Community 61
- Community 62
- Community 63
- Community 64
- Community 65
- Community 66
- Community 67
- Community 68
- Community 69
- Community 70
- Community 71
- Community 72
- Community 73
- Community 74
- Community 75
- Community 76
- Community 77
- Community 78
- Community 79
- Community 80
- Community 81
- Community 82
- Community 83
- Community 84
- Community 85
- Community 86
- Community 87
- Community 88
- Community 89
- Community 90
- Community 91
- Community 92
- Community 93
- Community 94
- Community 95
- Community 96
- Community 97
- Community 98
- Community 99
- Community 100
- Community 101
- Community 102
- Community 103
- Community 104
- Community 105
- Community 106
- Community 107
- Community 108
- Community 109
- Community 110
- Community 111
- Community 112
- Community 113
- Community 114
- Community 115
- Community 116
- Community 117
- Community 118
- Community 119
- Community 120
- Community 121
- Community 122
- Community 123

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

## Communities (128 total, 43 thin omitted)

### Community 0 - "Community 0"
Cohesion: 0.05
Nodes (93): saveAnalysis(), AnalysisSidebar(), AnalysisSidebarProps, BillBreakdown(), BillBreakdownProps, SimulationMonth, BillComparisonChart(), BillComparisonChartProps (+85 more)

### Community 1 - "Community 1"
Cohesion: 0.07
Nodes (53): LocationImageGeoTransform, PdfPageShell(), Props, PrintPage1Workbench(), Props, useCanvasInteractions(), UseCanvasInteractionsOptions, aabbsOverlap() (+45 more)

### Community 2 - "Community 2"
Cohesion: 0.07
Nodes (38): calculateAverageFlux(), computeMonthlyEnergy(), computeMonthlyEnergyFromRasters(), pointInPolygon(), PreloadedFluxRasters, preloadFluxRasters(), getRotatedCorners(), rotatePoint() (+30 more)

### Community 3 - "Community 3"
Cohesion: 0.04
Nodes (45): concurrently, eslint, @eslint/js, eslint-plugin-react-hooks, globals, dependencies, @prisma/client, devDependencies (+37 more)

### Community 4 - "Community 4"
Cohesion: 0.08
Nodes (30): ChatLauncher(), ChatLauncherProps, ChatPanel(), ChatPanelProps, getPaybackYears(), ChatContext, ChatContextValue, ChatMessage (+22 more)

### Community 5 - "Community 5"
Cohesion: 0.05
Nodes (36): autoprefixer, devDependencies, autoprefixer, jsdom, tailwindcss, @tailwindcss/vite, @testing-library/react, @types/google.maps (+28 more)

### Community 6 - "Community 6"
Cohesion: 0.12
Nodes (31): parseBuildingInsights(), downloadLayer(), fetchLocationPipelineInputs(), getLayerUrl(), LAYER_FILENAMES, PipelineFetchResult, SolarLayerKey, persistLocationPipelineFailure() (+23 more)

### Community 7 - "Community 7"
Cohesion: 0.11
Nodes (26): Badge(), BadgeProps, badgeVariants, Logo(), LogoProps, Separator, Skeleton(), TooltipContent (+18 more)

### Community 8 - "Community 8"
Cohesion: 0.13
Nodes (28): roofSegments, solarPanels, roofSegments, setup(), solarPanels, getPanelAnnualEnergy(), getSortedPanelIds(), UndoRedoSnapshot (+20 more)

### Community 9 - "Community 9"
Cohesion: 0.12
Nodes (30): createProject(), findOwnedProject(), getPdfProjectData(), getProject(), listProjects(), saveAnalysis(), saveLayout(), updateLayoutPreferences() (+22 more)

### Community 10 - "Community 10"
Cohesion: 0.12
Nodes (23): formatDisplay(), TARIFF_FIELDS, TariffField, TariffParameterModal(), TariffParameterModalProps, CoverageNoticeModal(), Props, writeCoverageNoticeDismissed() (+15 more)

### Community 11 - "Community 11"
Cohesion: 0.16
Nodes (26): buildPdfAnalysisViewModel(), PdfAnalysisViewModel, AnalysisDisclaimerKey, AnalysisMode, AnalysisChartDataPoint, isSeasonalProfile(), LayoutOrientationSummary, summarizeLayoutOrientation() (+18 more)

### Community 12 - "Community 12"
Cohesion: 0.11
Nodes (21): LifecycleControlsProps, TariffControlsProps, DropdownMenu(), DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuRadioItem (+13 more)

### Community 13 - "Community 13"
Cohesion: 0.07
Nodes (27): puppeteer-core, dependencies, puppeteer-core, @sparticuz/chromium, zod, description, devDependencies, @types/node (+19 more)

### Community 14 - "Community 14"
Cohesion: 0.14
Nodes (22): filterByDirection(), PanelYieldEntry, RoofSegmentEntry, SIZING_GOAL_OFFSET, azimuthMatchesRoofDirection(), ROOF_DIRECTION_WINDOWS, segmentMatchesRoofDirection(), SegmentWithAzimuth (+14 more)

### Community 15 - "Community 15"
Cohesion: 0.08
Nodes (24): dist, node_modules, compilerOptions, allowImportingTsExtensions, declaration, declarationMap, esModuleInterop, forceConsistentCasingInFileNames (+16 more)

### Community 16 - "Community 16"
Cohesion: 0.16
Nodes (23): bucketByOrientation(), ChatPage, ChatProject, countActivePanels(), countSegmentsUsed(), describeInverterReplacements(), formatMaybeNumber(), formatNumber() (+15 more)

### Community 17 - "Community 17"
Cohesion: 0.08
Nodes (23): compilerOptions, jsx, lib, noEmit, paths, rootDir, types, exclude (+15 more)

### Community 18 - "Community 18"
Cohesion: 0.16
Nodes (18): ApiError, getLocationStatus(), createProject(), readCoverageNoticeDismissed(), LowerResolutionConsentModal(), ManualCoordinateModal(), ensureLoaded(), loader (+10 more)

### Community 19 - "Community 19"
Cohesion: 0.10
Nodes (17): AnalysisPage, AnalyticsPage, DashboardPage, FAQPage, MapPage, NotFoundPage, PAGE_LOADING_HINTS, PdfPreviewPage (+9 more)

### Community 20 - "Community 20"
Cohesion: 0.13
Nodes (17): GroupPanel, GroupRotationHandle(), GroupRotationHandleProps, getPanelColorByRatio(), panelAnnualEnergy(), PanelLayer(), PanelLayerProps, RenderPanel (+9 more)

### Community 21 - "Community 21"
Cohesion: 0.10
Nodes (21): devDependencies, prisma, tsx, @types/compression, @types/cors, @types/express, @types/jsonwebtoken, @types/node (+13 more)

### Community 22 - "Community 22"
Cohesion: 0.17
Nodes (14): asyncHandler(), AsyncRouteHandler, Express, Request, requireAuth(), validate(), chatRouter, locationsRouter (+6 more)

### Community 23 - "Community 23"
Cohesion: 0.20
Nodes (15): listProjects(), formatRelativeDate(), PortfolioStats, projectRoute(), ProjectCard(), PageContainer(), PageContainerProps, VARIANTS (+7 more)

### Community 24 - "Community 24"
Cohesion: 0.11
Nodes (19): dependencies, dotenv, express, @google/genai, jsonwebtoken, @prisma/client, proj4, @shared/types (+11 more)

### Community 25 - "Community 25"
Cohesion: 0.16
Nodes (11): DEFAULT_HINTS, LoadingOverlay(), Slider, IrradianceGlowProps, MONTH_LABELS, MONTHLY_AZIMUTH, MONTHLY_IRRADIANCE, useCanvasZoom() (+3 more)

### Community 26 - "Community 26"
Cohesion: 0.19
Nodes (16): getLocationDataForUser(), getLocationStatusForUser(), getLocationStatusResponseForUser(), getOverlayResponseForUser(), linkOwnedProjectToLocation(), probeLocation(), resolveLocation(), resolveLocationResponse() (+8 more)

### Community 27 - "Community 27"
Cohesion: 0.13
Nodes (17): apiFetch(), probeLocation(), recomputeFlux(), recomputeFluxBatch(), resolveLocation(), deleteProject(), PdfExportToken, ProjectAnalysisConfig (+9 more)

### Community 28 - "Community 28"
Cohesion: 0.17
Nodes (12): getQuota(), Notification, formatReset(), useQuota(), emit(), Listener, listeners, notifications (+4 more)

### Community 29 - "Community 29"
Cohesion: 0.22
Nodes (14): getTariffConfig(), ConsumptionControlsProps, AnalysisFormState, ChartDataPoint, useAnalysisForm(), ConsumptionProfile, aggregateMonthlyGeneration(), applyPerformanceRatio() (+6 more)

### Community 30 - "Community 30"
Cohesion: 0.18
Nodes (13): ClientMode, getGenAIClient(), invalidateForAuthFailure(), GuardResult, PATTERNS, validateChatInput(), buildContents(), ChatEvent (+5 more)

### Community 31 - "Community 31"
Cohesion: 0.15
Nodes (14): ImageGeoTransform, RoofMaskResult, buildLocationDataResponse(), LocationDataRouteResponse, LocationDataWithGeoTransform, FluxRecomputeBatchRequest, FluxRecomputeBatchResponse, FluxRecomputeRequest (+6 more)

### Community 32 - "Community 32"
Cohesion: 0.13
Nodes (14): ChatRequest, liveStateSchema, AnalysisConfigDto, analysisConfigSchema, AnalysisResultsDto, analysisResultsSchema, billBreakdownSchema, buildingInsightsSchema (+6 more)

### Community 33 - "Community 33"
Cohesion: 0.12
Nodes (16): aliases, components, hooks, lib, ui, utils, rsc, $schema (+8 more)

### Community 34 - "Community 34"
Cohesion: 0.14
Nodes (10): AppFooter(), AppLayoutProps, AppSidebar(), AppSidebarProps, NAV_SECTIONS, NavItem, NavSectionDef, Section (+2 more)

### Community 35 - "Community 35"
Cohesion: 0.14
Nodes (7): HERO_PROFILES, HeroProfile, LandingPage(), PipelineStep, useHeroTicker(), useScrollY(), useAuthMock

### Community 36 - "Community 36"
Cohesion: 0.12
Nodes (16): api/**/*.ts, ES2022, compilerOptions, allowSyntheticDefaultImports, esModuleInterop, isolatedModules, lib, module (+8 more)

### Community 37 - "Community 37"
Cohesion: 0.18
Nodes (14): __dirname, KNOWLEDGE_PATH, loadKnowledgeBible(), parseSections(), renderKnowledgeForPrompt(), buildSystemInstruction(), ChatLanguage, ChatPage (+6 more)

### Community 38 - "Community 38"
Cohesion: 0.23
Nodes (11): App(), AuthContext, AuthContextValue, AuthProvider(), LocaleContext, LocaleContextValue, LocaleProvider(), readInitialLocale() (+3 more)

### Community 39 - "Community 39"
Cohesion: 0.23
Nodes (9): AppNav(), Crumb, useBreadcrumbs(), ThemeToggle(), Button, ButtonProps, buttonVariants, NotificationPopover() (+1 more)

### Community 40 - "Community 40"
Cohesion: 0.22
Nodes (11): __dirname, env, envSchema, parsed, supabase, loadGeoTIFFWithFallback(), loadReferenceGeoTransform(), loadRoofMask() (+3 more)

### Community 41 - "Community 41"
Cohesion: 0.19
Nodes (12): getProjectForPdf(), ProjectResponse, FooterProps, HeaderProps, PdfFixedFooter(), PdfFixedHeader(), PrintReport(), PrintReportProps (+4 more)

### Community 42 - "Community 42"
Cohesion: 0.13
Nodes (14): devDependencies, typescript, exports, typescript, license, main, name, private (+6 more)

### Community 43 - "Community 43"
Cohesion: 0.20
Nodes (7): prisma, AppError, BadRequestError, ForbiddenError, NotFoundError, tariffRouter, TariffConfigResponse

### Community 44 - "Community 44"
Cohesion: 0.21
Nodes (8): GoogleSignInButton(), GoogleSignInButtonProps, ProtectedRoute(), useAuth(), SignInPage(), navigateMock, signInMock, useAuthMock

### Community 45 - "Community 45"
Cohesion: 0.21
Nodes (8): allowedOrigins, app, __dirname, errorHandler(), requestLogger(), healthRouter, projectsRouter, HealthResponse

### Community 46 - "Community 46"
Cohesion: 0.22
Nodes (10): hits, pdfTokenRateLimit(), createProjectSchema, saveAnalysisSchema, saveLayoutSchema, updateLayoutPreferencesSchema, createProjectRequestSchema, saveAnalysisRequestSchema (+2 more)

### Community 47 - "Community 47"
Cohesion: 0.21
Nodes (10): Express, extractToken(), Request, requirePdfToken(), InvalidPdfTokenError, PdfTokenPayload, SignedPdfToken, signPdfToken() (+2 more)

### Community 48 - "Community 48"
Cohesion: 0.19
Nodes (8): useWorkbenchKeyboard(), UseWorkbenchKeyboardOptions, billRangeToAnnualKwh(), describeLayoutPreset(), inferVisibleCount(), panels(), getPanelAnnualEnergy(), WorkbenchPage()

### Community 49 - "Community 49"
Cohesion: 0.29
Nodes (12): AnalysisConfig, ConnectionPhase, getConnectionPhase(), getConsumptionProfile(), getNumber(), getRoofType(), getTariffRatesOverride(), isRecord() (+4 more)

### Community 50 - "Community 50"
Cohesion: 0.33
Nodes (11): BillBreakdown, BillingConfig, computeBill(), computeNemMonth(), lookupEeiRebate(), round2(), round5sen(), runAnnualSimulation() (+3 more)

### Community 51 - "Community 51"
Cohesion: 0.17
Nodes (11): compilerOptions, outDir, rootDir, exclude, extends, include, src/**/*.test.ts, src/**/*.ts (+3 more)

### Community 52 - "Community 52"
Cohesion: 0.31
Nodes (9): categoriseError(), ChatLanguage, ErrorCategory, getErrorCode(), localiseErrorMessage(), redactErrorMessage(), generateWithRetry(), isRetryable() (+1 more)

### Community 53 - "Community 53"
Cohesion: 0.18
Nodes (11): class-variance-authority, dependencies, class-variance-authority, @googlemaps/js-api-loader, i18next-browser-languagedetector, react-markdown, @tanstack/react-query, @googlemaps/js-api-loader (+3 more)

### Community 54 - "Community 54"
Cohesion: 0.24
Nodes (8): MODEL_CELL_COLORS, ModelCard(), PanelModelDrawer(), PanelModelDrawerProps, PanelPreview3D, PANEL_MODELS, panelEditSchema, PanelModel

### Community 55 - "Community 55"
Cohesion: 0.33
Nodes (9): BadgeVariant, getProjectStatusConfig(), getProjectStatusLabel(), getProjectStatusTooltip(), getProjectStatusVariant(), STATUS_CONFIGS, StatusConfig, ALL_STATUSES (+1 more)

### Community 56 - "Community 56"
Cohesion: 0.25
Nodes (9): computeSystemCost(), CostInputs, costModelDefaults, electricalBosCost(), InverterSku, permitCost(), scaffoldingCost(), selectInverter() (+1 more)

### Community 57 - "Community 57"
Cohesion: 0.42
Nodes (7): checkQuota(), { count, single, eq, select, from }, countProjectsSinceUtcMidnight(), getQuotaSummary(), getUserTier(), nextUtcMidnight(), startOfUtcDay()

### Community 58 - "Community 58"
Cohesion: 0.27
Nodes (9): ColorStop, dsmStops, fluxStops, getOrGenerateOverlay(), getStopsForType(), lerpColor(), maskStops, OverlayType (+1 more)

### Community 59 - "Community 59"
Cohesion: 0.24
Nodes (7): requestPdfExportToken(), BASE_STYLE, baseOptions, notify, buildPdfFileName(), sanitizeFileName(), notificationStore

### Community 60 - "Community 60"
Cohesion: 0.31
Nodes (7): getOverlayUrl(), CanvasLegends(), CanvasLegendsProps, SegmentHull, OverlayMode, useLoadedImage(), useOverlayImages()

### Community 61 - "Community 61"
Cohesion: 0.33
Nodes (7): LanguageToggle(), useLocale(), LOCALE_LABELS, LOCALE_TO_INTL, resources, SUPPORTED_LOCALES, SupportedLocale

### Community 62 - "Community 62"
Cohesion: 0.22
Nodes (6): createProjectMock, getLocationStatusMock, getProjectMock, navigateMock, probeLocationMock, resolveLocationMock

### Community 63 - "Community 63"
Cohesion: 0.25
Nodes (6): __dirname, EEI_TABLE, prisma, RATES, THRESHOLDS, TariffDefaults

### Community 64 - "Community 64"
Cohesion: 0.22
Nodes (8): *.ts, compilerOptions, composite, outDir, rootDir, extends, include, ../tsconfig.json

### Community 65 - "Community 65"
Cohesion: 0.36
Nodes (8): BodySchema, handler(), normalizeOrigin(), PAGE_MARGIN, parseAllowedOrigins(), resolveCorsOrigin(), setCorsHeaders(), VIEWPORT

### Community 66 - "Community 66"
Cohesion: 0.32
Nodes (6): geotiff, convertRgbTiffToPng(), toArrayBuffer(), DownloadedLayer, StoredLocationAssets, geotiff

### Community 67 - "Community 67"
Cohesion: 0.29
Nodes (4): LoadedStreamChatModule, loadStreamChat(), makeProject(), TEST_ENV

### Community 68 - "Community 68"
Cohesion: 0.32
Nodes (7): globals, isOff(), prettier, reactHooks, tseslint, typescriptFiles, warnings()

### Community 69 - "Community 69"
Cohesion: 0.25
Nodes (6): handleExportPdfMock, markProjectVisitedMock, navigateMock, notifyErrorMock, notifySuccessMock, saveAnalysisMock

### Community 70 - "Community 70"
Cohesion: 0.29
Nodes (6): license, name, prisma, seed, private, type

### Community 71 - "Community 71"
Cohesion: 0.29
Nodes (6): calculateRadiusMock, enrichBuildingInsightsMock, fetchBuildingInsightsMock, fetchDataLayersMock, parseBuildingInsightsMock, VALID_BI

### Community 72 - "Community 72"
Cohesion: 0.43
Nodes (5): CardItem, loadOrder(), reconcile(), saveOrder(), SortableCardContainer()

### Community 74 - "Community 74"
Cohesion: 0.38
Nodes (5): getModalPosition(), GuidedTour(), GuidedTourModal(), TourStep, getWorkbenchTourSteps()

### Community 75 - "Community 75"
Cohesion: 0.53
Nodes (5): getLocationData(), getProject(), decodeBase64(), DecodedRoofMask, useWorkbenchData()

### Community 76 - "Community 76"
Cohesion: 0.33
Nodes (4): listProjectsMock, navigateMock, useAuthMock, useQuotaMock

### Community 77 - "Community 77"
Cohesion: 0.33
Nodes (4): deleteProjectMock, listProjectsMock, navigateMock, useQuotaMock

### Community 78 - "Community 78"
Cohesion: 0.33
Nodes (5): maxDuration, memory, functions, api/pdf-export.ts, $schema

### Community 79 - "Community 79"
Cohesion: 0.40
Nodes (5): scripts, build, dev, start, test

### Community 80 - "Community 80"
Cohesion: 0.60
Nodes (4): Props, readPermanentDismiss(), WorkbenchHintOverlay(), writePermanentDismiss()

### Community 81 - "Community 81"
Cohesion: 0.60
Nodes (4): getProjectLastVisitedAt(), markProjectVisited(), readEntries(), RecentProjectActivity

## Knowledge Gaps
- **568 isolated node(s):** `name`, `private`, `license`, `type`, `dev` (+563 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **43 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `geotiff` connect `Community 66` to `Community 24`, `Community 2`, `Community 40`, `Community 58`?**
  _High betweenness centrality (0.059) - this node is a cross-community bridge._
- **Why does `dependencies` connect `Community 24` to `Community 66`, `Community 70`, `Community 86`, `Community 87`, `Community 88`, `Community 89`?**
  _High betweenness centrality (0.057) - this node is a cross-community bridge._
- **Why does `loadFluxData()` connect `Community 2` to `Community 40`, `Community 66`?**
  _High betweenness centrality (0.048) - this node is a cross-community bridge._
- **What connects `name`, `private`, `license` to the rest of the system?**
  _568 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Community 0` be split into smaller, more focused modules?**
  _Cohesion score 0.050747442958300554 - nodes in this community are weakly interconnected._
- **Should `Community 1` be split into smaller, more focused modules?**
  _Cohesion score 0.07490079365079365 - nodes in this community are weakly interconnected._
- **Should `Community 2` be split into smaller, more focused modules?**
  _Cohesion score 0.07482993197278912 - nodes in this community are weakly interconnected._