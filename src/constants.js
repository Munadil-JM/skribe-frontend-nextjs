//LOCAL
//const prefixUrl = "https://localhost:44323/v1/";

//Beta host name IP Address: 103.191.208.140

export const Url_V1 = process.env.NEXT_PUBLIC_PREFIX_URL_V1;
export const url = process.env.NEXT_PUBLIC_PREFIX_URL;
export const ATTACH_URL = process.env.NEXT_PUBLIC_ATTACHMENT_URL;
export const baseURL = `${ATTACH_URL}JournoImage/`;
export const OUTLETPATH = `https://www.goskribe.com/API/outletimage`;
export const SUPPTIMAGE = `${url}suppimage/`;
export const CHAIIMG = `${url}SkribeExtra/`;

export const RESETPASS = process.env.NEXT_PUBLIC_RESET_PASS;

//Beta  host name 215 end

//STATIC COUNT USE FOR SELECT ALL BUTTON
export const STATICCOUNT = 1000;
export const LOGINAPI = `${Url_V1}authenticate/login`;
export const USERINFO = `${Url_V1}Authenticate/user-info`;
export const GENERATEOTP = `${Url_V1}Authenticate/generateOTP`;
export const REFRESHTOKEN_API = `${Url_V1}authenticate/refresh-token`;
export const FORGOTTOKEN = `${Url_V1}authenticate/forget-password?email=`;
export const RESETPASSWORD = `${RESETPASS}reset-password`;
export const changePassAfterLogin = `${Url_V1}Authenticate/Change-Password`;
export const MAILPASSRESET = `${Url_V1}authenticate/forget-reset-password`;
// BEATWATCH FULL ARTICLE
export const BEATFULLARTICLE = `${Url_V1}fullArticle?ArticleId=`;
//CUSTOMIZED CRM
export const PRECUSTOMCRM = `${Url_V1}userpreference/getCrmJourno`;
// REPORTS API CALL
export const REPORTSAPI = `${Url_V1}reporting`;
// SETTING API CALL
export const USERPREFERENCES = `${Url_V1}userpreference/preferences`;
export const USERPREFERENCESPOST = `${Url_V1}userpreference/preferences`;
export const ALLGEO = `${Url_V1}userpreference/geo`;
export const GETMEDIATYPE = `${Url_V1}userpreference/media`;
export const GETALLBEATS = `${Url_V1}userpreference/beat?IsReporting=false&IsBeat=true&IsGenre=false`;
export const GETALLCOMPETITORS = `${Url_V1}userpreference/competitor`;
export const GETALLTOPICS = `${Url_V1}userpreference/topic`;
export const GETALLBRANDS = `${Url_V1}userpreference/brand`;
export const GETALLSPOKES = `${Url_V1}userpreference/spokesperson`;
// SETTING API CALL END test

// OUTLET BY MEDIA TYPE API
export const GETOUTLETBYMEDIATYPE = `${Url_V1}getOutletByMediaType?MediaFilter=`;

// CAMPAIGN API (LIST API)
export const CREATELIST = `${Url_V1}CreateList`;
export const GETCAMPAIGNLIST = `${Url_V1}GetLists`;
export const GETLISTDETAILS = `${Url_V1}GetListDetails?ListId=`;
export const LISTCOUNT = `${Url_V1}ListCount`;
export const LISTTRACKING = `${Url_V1}ListTracking?CampaignId=`;
export const GETLISTSENDMAIL = `${Url_V1}MailCount_Signature_Quota?ListId=`;
export const DELETELIST = `${Url_V1}DeleteList/`;
export const DELETEJOURNALISTFROMLIST = `${Url_V1}DeleteJournalistsFromList/`;

//EMAIL QUOTA
export const GETEMAILQUOTA = `${Url_V1}UserEmailQuota`;

// SEND E-MAIL API
//export const LISTSENDMAIL = `${Url_V1}MailCount_Signature_Quota`;
// export const LISTSENDMAIL = `${Url_V1}ListSendMail`;
export const LISTSENDMAIL = `${Url_V1}SendMailByJourIDs`;
//MailCount_Signature_Quota

//CRM API CALL
export const CRMAPI = `${Url_V1}getCrm`;

//DELETE RECORD FROM MAIN CRM PAGE
export const DELCRMRECORD = `${Url_V1}crm`;

//LOGOUT API CALL
export const logout_API = `${Url_V1}authenticate/logout`;

// PRE CRM POST DATA TO ADD TO CRM START
export const PRECRM_POSTDATA = `${Url_V1}crmJournalist`;

export const dashboard_API = `${Url_V1}reporting?pageSize=10`;
export const crm_API = `${Url_V1}getCrm?pageSize=10`;
export const journalist_API = `${Url_V1}Get-Journalist-by-Id?Id=`;
export const JOURNALISTPORTFOLIO = `${Url_V1}GetJournoPortfolio?pageSize=10&JournoId=`;
export const JOURNALISTSUGGESTIONS = `${Url_V1}Get-JournalistSugg?ids=`;

/* REPORT - BRAND */
export const brandBeat = `${Url_V1}userpreference/beat?GetReportingBrand=true`;
export const brandAPI = `${Url_V1}brand?Beat=`;
export const brandAPIAggregation = `${Url_V1}Count?Keyword=`;
export const brandAPI_Article = `${Url_V1}ElasticArticle?Keyword=`;

/* REPORT - INFLUENCER */
export const trendingInfluencer = `${Url_V1}ElasticInfluencer?Keyword=`;
export const influencerAPI_Article = `${Url_V1}InfluencerArticle?Keyword=`;
/* https://beta.goskribe.com/API/v1/ElasticArticle?Keyword=Art%20%26%20Culture */

/* REPORT - SPOKESPERSON */
export const trendingSpokesperson = `${Url_V1}SpokPersonKeyword?Keyword=`;
export const spokespersonAPI_Article = `${Url_V1}SpokPersonArticle?Keyword=`;

/* REPORT - TOPIC */
export const trendingTopic = `${Url_V1}TopicKeyword?Keyword=`;
export const topicAPI_Article = `${Url_V1}TopicArticle?Keyword=`;
export const topicWebsiteAPI = `${Url_V1}TopicWebsiteAggregation?Keyword=`;
export const topicAuthorAPI = `${Url_V1}TopicAuthorAggregation?Keyword=`;

/* SEARCH API BY BEAT,OUTLET, MEDIA TYPE */
//export const SEARCHBY = `${Url_V1}getJournalistsDetails`;
export const JOURNOBYFILTER = `${Url_V1}CreateListbyFilter`;
export const ADVANCESEARCH = `${Url_V1}CreateListArtJour`;
//NEW SEARCH RESULT API FOR ALL PAGES
export const GETALLJOURNO = `${Url_V1}GetJournalists`;
export const GETALLJOURNO_REGIONAL = `${Url_V1}GetJournalistsRegional`;

//OUTLET SUPPLEMENTS
export const OUTLETSUPPLEMENT = `${Url_V1}OutletSuplenent`;

//SKRIBE EXTRA BEFORE LOGIN
export const SKRIBEEXTRA = `${Url_V1}SkribeExtra`;
//PRE-LOGIN CONTACT FORM
export const CONTACTSKRIBE = `${Url_V1}ContactUs/Insert`;

//PODCAST HOMEPAGE
export const PODCASTHOME = `${Url_V1}PodcastMostTrending`;
export const PODCASTDETAIL = `${Url_V1}PodcastDetails`;
export const SOCIALCATEGOARY = `${Url_V1}PodcastGenreDetails`;

//DOWNLOAD CAMPAIGN URL
export const DOWNLOADCAMPAIGN = `${Url_V1}ListDownloadCount`;

//POST TRACKING API
export const POSTTRACK = `${Url_V1}PostTracking`;

//Dashboard APi
export const HEADERAPI = `${Url_V1}UsageStatistics`;
export const TRENDINGJOURNALISTS = `${Url_V1}TrendingJournalists`;
export const SKRIBE365 = `${Url_V1}Skribe365/Get?pageSize=10`;
export const FAVOURITEJOURNALISTS = `${Url_V1}CrmJourPortfolio`;
export const BEATWATCH = `${Url_V1}BeatWatch`;

//INSTAGRAM PAGE
export const instagram = `${Url_V1}Instagram`;
export const instaFilter = `${Url_V1}FilterCategory`;
export const instaDetail = `${Url_V1}InfluncerProfile`;
export const searchByNames = `${Url_V1}SearchInfNames`;

//SMARTPROFILE
export const JOURNALISTPORTFOLIOBYID = `${Url_V1}JournalistPortfolioByJid`;
export const JOURNALISTSPOKESPERSON = `${Url_V1}GetJournalistSpokePerson`;
export const JOURNALISTTOPICS = `${Url_V1}GetJournalistTopic`;
// export const JOURNALISTBRAND = `${Url_V1}GetJournalistBrand`;
export const JOURNALISTBRAND = `${Url_V1}GetJournalistBrandTopicSpokePerson`;
export const JOURFREQCOUNT = `${Url_V1}JourFrequencyWeeklyCount`;
//TWITTER PAGE API
export const twitter = `${Url_V1}GetTwitter`;
export const twitterMedia = `${Url_V1}MediaFilter`;
export const twitterCity = `${Url_V1}CityFilter`;
export const twitterOutlet = `${Url_V1}OutletFilter`;
export const twitterBeat = `${Url_V1}BeatFilter`;

//GEO PAGE API
export const GEOSTATS = `${Url_V1}GeoStatistics`;
export const GEOMEDIADENSITY = `${Url_V1}GeoMediaDensityLang`;
export const GEOOUTLET = `${Url_V1}GeoOutlet`;

//DROP DOWN SEARCH BY GEO
export const GEOBYCITY = `${Url_V1}Get-Search-by-Category`;

//BRAND DASHBOARD API FOR LANUGAUAGE WISE AND SENTIMENT SCORE
//export const LANGSENT = `${Url_V1}BrandDashboard`;
export const BRANDLANGUAGE = `${Url_V1}BrandDashboardLanguage`;
export const BRANDSENTIMENT = `${Url_V1}BrandDashboardSentiment`;
export const SHAREVOICE = `${Url_V1}ShareOfVoice`;
export const CITYWISECOUNT = `${Url_V1}BrandDashboardMediaCount`;

//BRAND DASHBAOR API FOR TOP JOURNALIST BY BRAND
export const BYBRANDTOPJOURNO = `${Url_V1}BrandDashboardJourCount`;

//BRAND DASHBOARD ARTICLES
export const BRANDARTICLES = `${Url_V1}BrandDashboardArticle`;

//SPOKES PERSON ON BRAND DASHBOARD
export const SPOKESPERSONARTICLES = `${Url_V1}SpokePersonDashboardArticle`;

//BROADCAST BY SHOWS
export const BROADCASTBYSHOW = `${Url_V1}ShowByOutletId`;

//BRAND TRACKING POPUP
//https://beta.goskribe.com/API/v1/AddBrand?BrandName=Mutual%20Fund

export const ADD_BRAND = `${Url_V1}AddBrand`;

export const ADD_SPOKESPERSON = `${Url_V1}AddSpokePerson`;
export const DEACTIVATE_SPOKESPERSON = `${Url_V1}DeactivateSpokePerson`;

export const BRANDTRACKER = `${Url_V1}BrandTrackingData`;

export const ADD_BRAND_KEYWORD = `${Url_V1}AddBrandKeyWord`;
export const DEACTIVE_BRAND_KEYWORDS = `${Url_V1}DeactivateBrandKeyword`;

export const DEACTIVE_BRAND = `${Url_V1}DeactivateBrand`;
export const ADDCOMPETITOR = `${Url_V1}AddCompetitor`;
export const ADDCOMPETITORKEYWORDS = `${Url_V1}AddCompetitorKeyWord`;
export const DEACTIVE_COMP_KEYWORDS = `${Url_V1}DeactivateCompetitorKeyword`;
export const DEACTIVE_COMP = `${Url_V1}DeactivateCompetitor`;

//CREATE CAMPAIGN NEW APIS
export const CREATE_CAMPAIGN = `${Url_V1}CreateCampaign`;
export const GET_ALL_CAMPAIGNS = `${Url_V1}GetCampaigns`;
export const UPDATE_CAMPAIGN = `${Url_V1}UpdateCampaign`;
export const SAVE_ATTACHMENTS = `${Url_V1}AttachmentsSave`;
export const GET_PREVIEW = `${Url_V1}GetCampaignsPreview`;
export const LIST_BREAKDOWN = `${Url_V1}GetListOutletLoc`;
export const DELETE_CAMPAIGN = `${Url_V1}DeleteCamp`;
export const GET_ATTACHMENTS = `${Url_V1}GetAttachments`;
export const GET_ATTACH = `${Url_V1}get-attachment`;
export const GENERATE_MARKETING_CONTENT = `${Url_V1}GenerateMarketingContent`;

export const DELETE_ATTACHMENT = `${Url_V1}DeleteAttachment`;
export const CAMPAIGN_KEYWORDS = `${Url_V1}CampaignKeyWords`;

//CAMPAIGN DETAIL API
export const CAMPAIGN_STATS = `${Url_V1}GetCampaignStats`;
export const CAMPAIGN_TRACKING = `${Url_V1}CampTrackingCounts`;
export const GET_CAMPAIGN_KEYWORD = `${Url_V1}GetCampaignKeyword`;
export const BRAND_TOPICS = `${Url_V1}GetJournalistBrandTopic`;
export const ARTICLES_BY_JID = `${Url_V1}camJournalistPortfolioByJid`;
export const DELETE_BRAND_KEYWORD = `${Url_V1}CampaignKeyWords`;
export const CAMPAIGN_SEND_MAIL = `${Url_V1}CampaignSendMail`;

//MEDIA LIST API
export const DOWNLOAD_COUNT = `${Url_V1}DownloadCount`;
export const MEDIA_LIST = `${Url_V1}MediaLists`;

export const LIST_DETAILS = `${Url_V1}GetMediaListDetails`;
export const SEARCH_MEDIA_LIST = `${Url_V1}SearchJourMediaList`;
export const UPDATE_NAME_DESC = `${Url_V1}UpdateNameDesc`;
export const ADD_JOURNO_MEDIA_LIST = `${Url_V1}AddJourMediaList`;
export const DELETE_LIST_RECORD = `${Url_V1}DeleteJourMediaList`;
export const DUPLICATE_COPY = `${Url_V1}MediaListDuplicate`;
export const DELETE_LIST = `${Url_V1}DeleteList`;
export const USER_LIST_SHARE = `${Url_V1}UsersForListShare`;
export const SHARED_LIST = `${Url_V1}ShareMediaList`;

export const Freebies = "Freebies";

//ANNOUNCEMENT STRIP
export const ACTIVE_ANNOUNCEMENT = `${Url_V1}Announcement/GetActiveAnnounce`;

//CREATE FREEBIES ACCOUNT
export const FREESIGNUP = `${Url_V1}Authenticate/FreebiesSignUp`;
export const FREEBIES_EXPIRE_DAYS = `${Url_V1}Authenticate/FreebiesRemainingDays`;

//PRESS RELEASE FORM API
export const POST_FORM_DATA = `${Url_V1}ClientDynamicForm/PostClientFormData`;
export const GET_STATE = `${Url_V1}ClientDynamicForm/GetStates`;
export const GET_CITY = `${Url_V1}ClientDynamicForm/GetCities`;
export const GET_OUTELET = `${Url_V1}ClientDynamicForm/GetPublications`;

//BEFORE LOGIN SKRIBE MEDIA LIST
export const GET_ALL_MEDIA_LIST = `${Url_V1}GetAllSkribeMediaList`;
export const VIEW_MEDIA_LIST = `${Url_V1}GetProJournalist/`;

//REGIONAL API
export const stateList = `${Url_V1}GetRegionalState`;
export const cityList = `${Url_V1}GetRegionalCity`;
export const regionMetrix = `${Url_V1}GetRegionalStateMatrix`;
export const regionMediaGraph = `${Url_V1}RegionalMedia`;
// ADVANCE SEARCH APIS
export const GET_PEOPLE_JOUR_AND_BEAT = `${Url_V1}AdvSearPeoJour`;
export const GET_PEOPLE_TOPIC_AND_KEYWORD = `${Url_V1}AdvSearPeoArt`;
export const GET_ARTICLES_ALL_TYPES = `${Url_V1}AdvSearArt`;
export const GET_RECENT_SEARCHES = `${Url_V1}AdvSearRecent`;
export const GET_POPULAR_SEARCHES = `${Url_V1}AdvSearPopular`;
export const POST_INSERT_TRACKING = `${Url_V1}InsertTracking`;

// PressRelease Apis
export const PressReleaseEmail = `${Url_V1}PressReleaseEmail`;