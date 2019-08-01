const LANG = {

  'NO_DATA': 'Unavailable',

  // Header
  'LOGO_ALT_TEXT': 'Educational Opportunity Project',
  'TAB_CONCEPT_AVG': 'Average Test Scores',
  'TAB_METRIC_AVG': 'reflect educational opportunity',
  'TAB_CONCEPT_GRD': 'Learning Rates',
  'TAB_METRIC_GRD': 'reflect school effectiveness',
  'TAB_CONCEPT_COH': 'Trends in Test Scores',
  'TAB_METRIC_COH': 'reflect educational opportunity changes',

  // Menu
  'MENU_HOME': 'Home',
  'MENU_OPPORTUNITY': 'Opportunity Explorer',
  'MENU_DISCOVERIES': 'Discoveries',
  'MENU_ABOUT': 'About',
  'MENU_FAQ': 'FAQ',
  'MENU_METHODS': 'Methods',
  'MENU_RESEARCH': 'Research',
  'MENU_NEWS': 'In The News',
  'MENU_FACEBOOK': 'Educational Opportunity Project on Facebook',
  'MENU_TWITTER': 'Educational Opportunity Project on Twitter',
  'MENU_LINKEDIN': 'Educational Opportunity Project on LinkedIn',
  'MENU_YOUTUBE': 'Educational Opportunity Project on YouTube',

  // Footer
  'FOOTER_COPYRIGHT': 'Copyright 2019',
  'FOOTER_SHARE_LABEL': 'Share:',
  'FOOTER_SHARE_FACEBOOK': 'Share on Facebook',
  'FOOTER_SHARE_TWITTER': 'Share on Twitter',
  'FOOTER_SHARE_LINK': 'Share Link',
  'FOOTER_EXPORT_LABEL': 'Export:',
  'FOOTER_EXPORT_PDF': 'PDF',
  'FOOTER_EXPORT_PPT': 'Powerpoint',

  'DATA_UNAVAILABLE': 'No data available',

  // Help
  'HELP_SCREEN_READER': 'Help',

  // Metric Labels
  'LABEL_AVG': 'average test scores',
  'LABEL_GRD': 'learning rates',
  'LABEL_COH': 'trend in test scores',
  'LABEL_SEG': 'segregation',
  'LABEL_SES': 'socioeconomic status',
  'LABEL_PCT': 'Percent',
  'LABEL_FRL': 'free / reduced lunch program',

  'LABEL_SHORT_AVG': 'scores',
  'LABEL_SHORT_GRD': 'rate',
  'LABEL_SHORT_COH': 'trend',
  'LABEL_SHORT_SES': 'SES',
  'LABEL_SHORT_FRL': 'Free Lunch',

  'LABEL_CONCEPT_AVG': 'educational opportunity',
  'LABEL_CONCEPT_GRD': 'school effectiveness',
  'LABEL_CONCEPT_COH': 'change in educational opportunity',

  // Demographic Labels
  'LABEL_ALL': 'all',
  'LABEL_B': 'Black',
  'LABEL_W': 'white',
  'LABEL_H': 'Hispanic',
  'LABEL_A': 'Asian',
  'LABEL_M': 'male',
  'LABEL_F': 'female',
  'LABEL_P': 'poor',
  'LABEL_NP': 'non-poor',
  'LABEL_N': 'non-poor',

  // Gap Labels
  'LABEL_WB': 'white / Black gap',
  'LABEL_WH': 'white / Hispanic gap',
  'LABEL_PN': 'non-poor / poor gap',
  'LABEL_MF': 'male / female gap',
  'LABEL_GAP': '$[demographic1] and $[demographic2]',

  'LABEL_SHORT_BW': 'white / Black',
  'LABEL_SHORT_HW': 'white / Hispanic',
  'LABEL_SHORT_PN': 'poor / non-poor',
  'LABEL_SHORT_FM': 'male / female',

  // Region Labels
  'LABEL_COUNTIES': 'counties',
  'LABEL_DISTRICTS': 'school districts',
  'LABEL_SCHOOLS': 'schools',
  'LABEL_COUNTIES_SINGULAR': 'county',
  'LABEL_DISTRICTS_SINGULAR': 'school district',
  'LABEL_SCHOOLS_SINGULAR': 'school',

  'LABEL_BY_SUBGROUP': '$[metric] by subgroup',

  'TOOLTIP_SUMMARY': 'click on a location for more data.',
  'TOOLTIP_TYPE_MAP': 'an area on the map',
  'TOOLTIP_TYPE_CHART': 'an area on the chart',

  // Location Panel
  'SUMMARY_AVG_LOW': '$[name] provides <strong>lower than average</strong> educational opportunites.',
  'SUMMARY_AVG_MID': '$[name] provides <strong>roughly average</strong> educational opportunites.',
  'SUMMARY_AVG_HIGH': '$[name] provides <strong>higher than average</strong> educational opportunites.',
  
  'SUMMARY_AVGSES_LOW': 'Average scores are $[value] grade levels lower than $[region] with similar socioeconomic status.',
  'SUMMARY_AVGSES_MID': 'Average scores are equal to $[region] with similar socioeconomic status.',
  'SUMMARY_AVGSES_HIGH': 'Average scores are $[value] grade levels higher than $[region] with similar socioeconomic status.',
  'SUMMARY_AVGSES_NONE': '',
  
  'SUMMARY_GRD_LOW': '$[name] provides lower than average educational opportunities while children are in school.',
  'SUMMARY_GRD_MID': '$[name] provides roughly average educational opportunities while children are in school.',
  'SUMMARY_GRD_HIGH': '$[name] provides higher than average educational opportunities while children are in school.',
  
  'SUMMARY_COH_LOW': '$[name] shows declining educational opportunity.',
  'SUMMARY_COH_MID': '$[name] shows relatively stable educational opportunity.',
  'SUMMARY_COH_HIGH': '$[name] shows improving educational opportunity.',

  'SUMMARY_AVG_NONE': 'No community educational opportunity data for $[name].', 
  'SUMMARY_GRD_NONE': 'No school-based opportunity data for $[name].', 
  'SUMMARY_COH_NONE': 'No change in community educational opportunity data for $[name].', 
  'SUMMARY_SES_NONE': '',

  'CALLOUT_AVG_OPP': 'How do average test scores show educational opportunity?',
  'CALLOUT_AVG_SES': 'How does socioeconomic status impact educational opportunity?',
  'CALLOUT_GRD': 'How do learning rates show school effectiveness?',
  'CALLOUT_COH': 'How does the average trend in test scores show changes in educational opportunity?',

  'BUTTON_GAP_WB': 'Explore the white / Black Gap',
  'BUTTON_GAP_WH': 'Explore the white / Hispanic Gap',
  'BUTTON_GAP_PN': 'Explore the Poor / Non-poor Gap',
  'BUTTON_GAP_MF': 'Explore the male / female Gap',
  'BUTTON_DOWNLOAD_REPORT': 'Download Report',

  'LOCATION_COMPARE_FEATURES_TITLE': '$[region] Comparison',
  'LOCATION_COMPARE_FEATURES_NONE': 'Select another place from the map, chart, or search to compare it with $[name].',
  'LOCATION_COMPARE_FEATURES': 'Below are your previous location selections.  The arrows mark where $[name] falls on the scale.',
  'LOCATION_EXPORT_REPORT_TITLE': 'Export a Report',
  'LOCATION_EXPORT_REPORT': `Press the button below to generate a PDF report about educational opportunity in $[name].`,
  'LOCATION_DIFFERENCES_TITLE': 'Opportunity Differences',
  'LOCATION_DIFFERENCES': '',
  'LOCATION_SIMILAR_PLACES_TITLE': 'Similar $[region]',
  'LOCATION_SIMILAR_PLACES': `The following places are similar to $[name] based on size, socioeconomic status, and other factors:`,
  'LOCATION_SIMILAR_PLACES_SUMMARY': 'Find places similar to $[name] based on size, socioeconomic status:',
  'LOCATION_SIMILAR_SHOW': 'Show similar places',
  'LOCATION_SHOW_PLACE': 'Show data for $[name]',

  'LOCATION_SHOW_AVG': 'more details on average test scores',
  'LOCATION_SHOW_GRD': 'more details on learning rates',
  'LOCATION_SHOW_COH': 'more details on test score trends',
  'LOCATION_HIDE_AVG': 'hide details on average test scores',
  'LOCATION_HIDE_GRD': 'hide details on learning rates',
  'LOCATION_HIDE_COH': 'hide details on test score trends',

  // Explainers
  'EXPLAINER_AVG': 'Shows the set of educational opportunities children have had from birth to the time they take the tests',
  'EXPLAINER_GRD': 'Shows how much students learn on average while they are in school',
  'EXPLAINER_COH': 'Indicates the extent to which a community is getting better at providing educational opportunities over time',
  'EXPLAINER_SES': '',
  'EXPLAINER_SEG': '',

  // Description of metric value for location
  'VALUE_AVG_HIGH': 'Students score <strong>$[value] grade levels above</strong> U.S. average.',
  'VALUE_AVG_MID': 'Students test scores are at the national average.',
  'VALUE_AVG_LOW': 'Students score <strong>$[value] grade levels below</strong> U.S. average.',
  'VALUE_GRD_HIGH': 'Students learn <strong>$[value] more each grade</strong> than the U.S. average.',
  'VALUE_GRD_MID': 'Students learn the same each grade as the U.S. average.',
  'VALUE_GRD_LOW': 'Students learn <strong>$[value] less each grade</strong> than the U.S. average.',
  'VALUE_COH_HIGH': 'Test scores <strong>increased an average of $[value] grade levels</strong> each year from 2009-2016.',
  'VALUE_COH_MID': 'No change in test scores.',
  'VALUE_COH_LOW': 'Test scores <strong>decreased an average of $[value] grade levels</strong> each year from 2009-2016.',

  'VALUE_SES_ULTRA_HIGH': 'Socioeconomic status is <strong>very far above national average</strong>.',
  'VALUE_SES_VERY_HIGH': 'Socioeconomic status is <strong>far above national average</strong>.',
  'VALUE_SES_HIGH': 'Socioeconomic status is <strong>above national average</strong>.',
  'VALUE_SES_MID': 'Socioeconomic status is <strong>about average</strong>.',
  'VALUE_SES_LOW': 'Socioeconomic status is <strong>below national average</strong>.',
  'VALUE_SES_VERY_LOW': 'Socioeconomic status is <strong>far below national average</strong>.',
  'VALUE_SES_ULTRA_LOW': 'Socioeconomic status is <strong>very far below national average</strong>.',

  'VALUE_FRL': '<strong>$[value] of students</strong> qualify for free or reduced lunch program.',

  // 'VALUE_SEG': '',

  // Description of gap value for location
  'VALUE_AVG_GAP': 'Difference of $[amount] grade levels between $[gap] students.',
  'VALUE_GRD_GAP': 'Difference in growth $[increasedDecreased] $[amount] grade levels between $[gap] students.',
  'VALUE_COH_GAP': 'Difference in test scores $[increasedDecreased] $[amount] grade levels between $[gap] students.',
  'VALUE_SES_GAP': '',
  'VALUE_SEG_GAP': '',

  // Section Titles
  'TITLE_SES_AVG': 'Socioeconomic Status and Educational Opportunity',
  'TITLE_SES_GRD': 'Socioeconomic Status and School Performance',
  'TITLE_SES_COH': 'Socioeconomic Status and Changes in Opportunity',
  'TITLE_OPP_AVG': 'Differences in Opportunity',
  'TITLE_OPP_GRD': 'Differences in School Performance',
  'TITLE_OPP_COH': 'Differences in Changes of Opportunity',
  'TITLE_ACH_AVG': 'Gaps in Achievement',
  'TITLE_ACH_GRD': 'Gaps in Learning Rates',
  'TITLE_ACH_COH': 'Gaps in Opportunity Changes',

  // Section Descriptions

  // Scatterplot Titles
  'SP_TITLE_AVG_SES': 'Educational Opportunity vs. Socioeconomic Status',
  'SP_TITLE_AVG_FRL': 'Educational Opportunity vs. % Free or Reduced Lunch Program ',
  'SP_TITLE_GRD_SES': 'School Effectiveness vs. Socioeconomic Status',
  'SP_TITLE_GRD_FRL': 'School Effectiveness vs. % Free or Reduced Lunch Program',
  'SP_TITLE_COH_SES': 'Changes in Educational Opportunity and Socioeconomic Status',
  'SP_TITLE_COH_FRL': 'Changes in Educational Opportunity and % Free or Reduced Lunch Program',
  'SP_TITLE_AVG_SES_GAP': 'Differences in Educational Opportunity vs. Socioeconomic Status',
  'SP_TITLE_GRD_SES_GAP': 'Differences in School Effectiveness vs. Socioeconomic Status',
  'SP_TITLE_COH_SES_GAP': 'Differences in Educational Opportunity Change and Socioeconomic Status',

  'SP_TITLE': '$[metric] vs. $[secondary]',
  'SP_TITLE_GAP': 'Difference in $[metric] vs. $[secondary]',
  'SP_TITLE_VS': 'Differences in $[metric]',
  'SP_SUBTITLE': '$[place] $[region], $[demographic], grades 3 - 8 from 2009 - 2016, sized by number of students',

  'OP_TITLE_AVG': 'Achievement Differences Between $[dem1] and $[dem2]',
  'OP_TITLE_GRD': 'Growth Differences Between $[dem1] and $[dem2]',
  'OP_TITLE_COH': 'Change in Achievement Differences Between $[dem1] and $[dem2]',

  // Axis Names
  'AXIS_NAME_FRL_PCT': '% of students qualifying for free or reduced lunch program',
  'AXIS_NAME_SES': '',


  // Axis Labels
  'AXIS_AVG_MID': 'national\naverage',
  'AXIS_AVG_LOW_SINGLE': '$[value] grade\nbelow',
  'AXIS_AVG_LOW': '$[value] grades\nbelow',
  'AXIS_AVG_HIGH_SINGLE': '$[value] grade\nabove',
  'AXIS_AVG_HIGH': '$[value] grades\nabove',

  'AXIS_GRD_MID_SINGLE': 'learned 1 grade\nlevel per year',
  'AXIS_GRD_LOW_SINGLE': 'learned\n$[value] less',
  'AXIS_GRD_LOW': 'learned\n$[value] less',
  'AXIS_GRD_HIGH_SINGLE': 'learned\n$[value] more',
  'AXIS_GRD_HIGH': 'learned\n$[value] more',

  'AXIS_COH_MID': 'no\nchange',
  'AXIS_COH_LOW_SINGLE': 'dropped $[value]\ngrade level',
  'AXIS_COH_LOW': 'declined $[value]\ngrade levels per year',
  'AXIS_COH_HIGH_SINGLE': 'improved $[value]\ngrade level per year',
  'AXIS_COH_HIGH': 'improved $[value]\ngrade levels per year',

  'AXIS_AVG_GAP_ZERO': 'no gap\nin opportunity',
  'AXIS_AVG_GAP_LOW_SINGLE': '$[value] grade level\ndifference',
  'AXIS_AVG_GAP_LOW': '$[value] grade level\ndifference',
  'AXIS_AVG_GAP_HIGH_SINGLE': '$[value] grade level\ndifference',
  'AXIS_AVG_GAP_HIGH': '$[value] grade level\ndifference',

  'AXIS_GRD_GAP_ZERO': 'no\n difference',
  'AXIS_GRD_GAP_LOW': '$[value] growth gap',
  'AXIS_GRD_GAP_HIGH': '$[value] growth gap',

  'AXIS_COH_GAP_ZERO': 'no\ndifference',
  'AXIS_COH_GAP_LOW': '$[value]\n trend gap',
  'AXIS_COH_GAP_HIGH': '$[value]\ntrend gap',

  'AXIS_SES_MID': 'national\naverage',
  'AXIS_SES_LOW': 'poorer',
  'AXIS_SES_HIGH': 'richer',

  'AXIS_SES_ZERO_GAP': 'no gap in\nsocioeconomic status',
  'AXIS_SES_LOW_GAP': '$[demographic1] richer',
  'AXIS_SES_HIGH_GAP': '$[demographic2] richer',
  'AXIS_SES_GAP_ZERO': 'no\ngap',

  'AXIS_SEG_ZERO': 'no\nsegregation',
  'AXIS_SEG_LOW': 'less',
  'AXIS_SEG_HIGH': 'more',

  'AXIS_SEG_ZERO_GAP': 'no gap in\nsegregation',
  'AXIS_SEG_LOW_GAP': 'less',
  'AXIS_SEG_HIGH_GAP': 'more',

  // PREVIEW CHART AXIS LABELS
  'AXIS_PREV_ZERO': 'avg',
  'AXIS_PREV_MID': 'avg',
  'AXIS_PREV_HIGH_SINGLE': 'avg',

  // LINE FOR VERSUS CHART
  'LINE_EQUAL_OPPORTUNITY': 'no gap ($[demographic1] = $[demographic2])',

  // BUTTON TO TOGGLE SECONDARY CHART
  'BUTTON_SHOW_CHART': 'Show secondary chart',
  'BUTTON_HIDE_CHART': 'Hide secondary chart',

  // Intro Section
  'INTRO_TITLE': 'What type of educational opportunity would you like to explore?',
  'INTRO_DESCRIPTION': 'Using over 330 million test scores across the U.S., we have calculated $[avg], $[grd], and $[coh] to measure educational opportunity.',
  'SEARCH_PLACEHOLDER': 'Find a city, county, district, or school',
  'INTRO_CARD_DESCRIPTION_AVG': 'Average test scores are influenced by children`s opportunities to learn in their homes, in their neighborhoods, in the childcare, preschool, and after-school programs they attend, from their peers and friends, and in their schools. ',
  'INTRO_CARD_DESCRIPTION_GRD': 'Growth of test scores show how much students learn each year they are in school. It is a better measure of school quality and shows school-based opportunity.',
  'INTRO_CARD_DESCRIPTION_COH': 'Change in test scores show how test scores are improving or declining in an an area from 2009 - 2016.  This shows how community educational opportunity is changing.',

  // Map Legend (Mobile)
  'LEGEND_LOW': '◀ lower',
  'LEGEND_HIGH': 'higher ▶',
  'LEGEND_LOW_AVG': '◀ below grade level',
  'LEGEND_HIGH_AVG': 'above grade level ▶',
  'LEGEND_LOW_GRD': '◀ below 1 grade / year',
  'LEGEND_HIGH_GRD': 'above 1 grade / year ▶',
  'LEGEND_LOW_COH': '◀ scores dropping',
  'LEGEND_HIGH_COH': 'scores improving ▶',
  'LEGEND_LOW_SES': '◀ poorer',
  'LEGEND_HIGH_SES': 'richer ▶',
  'LEGEND_LOW_FRL': '◀ more poverty',
  'LEGEND_HIGH_FRL': 'less poverty ▶',

  'LEGEND_SHORT_LOW_AVG': '◀ lower',
  'LEGEND_SHORT_HIGH_AVG': 'higher ▶',
  'LEGEND_SHORT_LOW_GRD': '◀ lower',
  'LEGEND_SHORT_HIGH_GRD': 'higher ▶',
  'LEGEND_SHORT_LOW_COH': '◀ lower',
  'LEGEND_SHORT_HIGH_COH': 'higher ▶',
  'LEGEND_SHORT_LOW_SES': '◀ poorer',
  'LEGEND_SHORT_HIGH_SES': 'richer ▶',
  'LEGEND_SHORT_LOW_FRL': '◀ high poverty',
  'LEGEND_SHORT_HIGH_FRL': 'low poverty ▶',

  'LEGEND_LOW_AVG_GAP': 'smaller gap',
  'LEGEND_HIGH_AVG_GAP': 'larger gap',
  'LEGEND_LOW_GRD_GAP': 'smaller gap',
  'LEGEND_HIGH_GRD_GAP': 'larger gap',
  'LEGEND_LOW_COH_GAP': 'smaller gap',
  'LEGEND_HIGH_COH_GAP': 'larger gap',

  'HELP_PANEL_TITLE': 'Help',
  'HELP_PANEL_HOW_TAB': 'How to explore',
  'HELP_PANEL_WHAT_TAB': 'What am I seeing',

  // What am I seeing conditionals
  'HP_*_*_*_*_*': 'You are viewing a $[view] showing the relationship between $[metric] and $[secondary] for $[demographic] students in U.S. $[region].',
  'HP_*_*_AVG_*_*': 'Community Educational Opportunity is reflected in average test scores. These scores are influenced by children\'s opportunities to learn in their homes, in their neighborhoods, in the childcare, preschool, and after-school programs they attend, from their peers and friends, and in their schools. They encompass the total set of educational opportunities available in a community.',
  'HP_*_*_GRD_*_*': 'Schools’ contributions to educational opportunity are reflected in the growth of children’s test scores while they are in school. The growth of test scores indicates how much students learn while in school. Because average test scores are influenced by many out-of-school opportunities, they reflect more than what children learn while they are in school. So growth of test scores is a better measure of school quality.',
  'HP_*_*_COH_*_*': 'The change in test scores indicates whether educational opportunities are rising or falling in a community. For example, rates of change tell us whether this year’s third graders are doing better than last year’s third graders. They reflect both changes in school quality and changes in other family and community features that provide opportunities for children.',

  // What am I seeing labels
  'HP_MAP': 'map',
  'HP_CHART': 'chart',
  'HP_SPLIT': 'map and chart',
  'HP_SES' : 'socioeconomic status',

  'WT_MAP': 'The map shapes show $[region] with colors representing $[metric] for $[demographic] students.',
  'WT_MAP_ZOOMED': 'The dots on the map show schools with colors representing $[metric] for the school.',

  'WT_CHART': 'The chart shows circles for $[region] sized relative to the number of students. Both the position of the circle on the vertical axis and color show their $[metric].',
  'WT_CHART_SES': 'Circles on the left represent an area with lower socioeconomic status where circles on the right correspond to areas with higher socioeconomic status.',

  'WT_CONTEXT_W': 'For white students',
  'WT_CONTEXT_B': 'For Black students',
  'WT_CONTEXT_H': 'For Hispanic students',
  'WT_CONTEXT_A': 'For Asian students',
  'WT_CONTEXT_M': 'For male students',
  'WT_CONTEXT_F': 'For female students',
  'WT_CONTEXT_P': 'For poor students',
  'WT_CONTEXT_NP': 'For non-poor students',

  'WT_AVG_NONGAP_HIGH_CONCEPT': 'High Community Educational Opportunity',
  'WT_AVG_NONGAP_LOW_CONCEPT': 'Low Community Educational Opportunity',
  'WT_GRD_NONGAP_HIGH_CONCEPT': 'High School-based Opportunity',
  'WT_GRD_NONGAP_LOW_CONCEPT': 'Low School-based Opportunity',
  'WT_COH_NONGAP_HIGH_CONCEPT': 'Improvement in Community Opportunity',
  'WT_COH_NONGAP_LOW_CONCEPT': 'Decrease in Community Opportunity Growth',


  'WT_AVG_NONGAP_HIGH': 'average scores above grade level',
  'WT_AVG_NONGAP_MID': 'average test scores at grade level',
  'WT_AVG_NONGAP_LOW': 'average scores below grade level',
  'WT_GRD_NONGAP_HIGH': 'students learn more than 1 grade level per year',
  'WT_GRD_NONGAP_MID': 'students learn 1 grade level per year',
  'WT_GRD_NONGAP_LOW': 'students learn less than 1 grade level per year',
  'WT_COH_NONGAP_HIGH': 'test scores are improving',
  'WT_COH_NONGAP_MID': 'test scores are not changing',
  'WT_COH_NONGAP_LOW': 'test scores are decreasing',

  'WT_AVG_GAP_HIGH': '$[demographic1] students\' test scores are higher than $[demographic2] students\'',
  'WT_AVG_GAP_MID': '$[demographic1] students\' test scores are equal to $[demographic2] students\'',
  'WT_AVG_GAP_LOW': '$[demographic1] students\' test scores are lower than $[demographic2] students\'',
  'WT_GRD_GAP_HIGH': '$[demographic1] students\' test scores grow more each year than $[demographic2] students\'',
  'WT_GRD_GAP_MID': '$[demographic1] students\' test scores grow the same amount as $[demographic2] students\'',
  'WT_GRD_GAP_LOW': '$[demographic1] students\' test scores grow less each year than $[demographic2] students\'',
  'WT_COH_GAP_HIGH': '$[demographic1] students\' test scores are improving more for $[demographic2] students over time\'',
  'WT_COG_GAP_MID': '$[demographic1] students\' test scores are changing the same over time as $[demographic2] students\'',
  'WT_COH_GAP_LOW': '$[demographic1] students\' test scores are improving less over time than $[demographic2] students\'',
  'WT_NO_DATA': 'No data',

  'WT_Q1': 'How are $[metric] calculated?',
  'WT_Q1_AVG': 'The average test scores are calculated from elementary school students in grades 3 through 8 from 2009 - 2016. See the <a href="#">FAQ</a> for more details.',
  'WT_Q1_GRD': 'The growth of test scores are calculated from the increase in test scores each year as the students progress through elementary school. See the <a href="#">FAQ</a> for more details.',
  'WT_Q1_COH': 'The changes in test scores are calculated from the increase or decrease of test scores for a place from 2009 - 2016. See the <a href="#">FAQ</a> for more details.',

  'WT_Q2': 'How does $[metric] show $[concept]',
  'WT_Q2_AVG': 'The elementary students\' test scores are influenced by opportunities to learn in their homes, in their neighborhoods, in the childcare, preschool, and after-school programs they attend, from their peers and friends, and in their schools. They encompass the total set of educational opportunities available in a community.',
  'WT_Q2_GRD': 'The growth of students\' test scores indicates how much students\' test scores improve over the span of one year. A larger increase in growth means schools are able to teach more in a year, meaning students attending the school have a higher school-based educational opportunity.',
  'WT_Q2_COH': 'The change in test scores indicates whether educational opportunities are rising or falling in a community. For example, rates of change tell us whether this year’s third graders are doing better than last year’s third graders. They reflect both changes in school quality and changes in other family and community features that provide opportunities for children.',

  'WT_Q3': 'What impacts the level of $[concept]?',
  'WT_Q3_AVG': 'As seen in the chart view, higher socioeconomic status in an area is correlated with a higher community educational opportunity.',
  'WT_Q3_GRD': 'The quality of schools\' ability to teach students.',
  'WT_Q3_COH': 'Educational policies put in place impact the change in educational opportunity over time. (e.g. Tennessee)',

  'WT_Q4': 'What does $[secondary] represent?',
  'WT_Q4_SES': 'Socioeconomic status (SES) is a broad concept that includes such factors as educational attainment, occupation, income, wealth, and deprivation.',
  'WT_Q4_SEG': '',
  'WT_Q4_FRLP': '',

  'WT_Q5': 'What does the difference in $[metric] between $[demographic1] students and $[demographic2] students show me?',
  'WT_Q5_AVG': '',
  'WT_Q5_GRD': '',
  'WT_Q5_COH': '',
  
  'WT_Q6': 'How does $[demographic1] students\' $[concept] compare to $[demographic2]?',
  'WT_Q6_AVG': '',
  'WT_Q6_GRD': '',
  'WT_Q6_COH': '',

  
  // How to use conditionals 
  'HOW_*_*_*_*_*': 'How to use content',

}

export default LANG