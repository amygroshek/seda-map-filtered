import { isGapDemographic } from "../modules/config";

const LANG = {

  'NO_DATA': 'Unavailable',

  // Header
  'LOGO_ALT_TEXT': 'Educational Opportunity Project',
  'TAB_CONCEPT_AVG': 'Educational Opportunity',
  'TAB_METRIC_AVG': 'shown by average test scores',
  'TAB_CONCEPT_GRD': 'School Performance',
  'TAB_METRIC_GRD': 'shown by growth in test scores',
  'TAB_CONCEPT_COH': 'Changes in Opportunity',
  'TAB_METRIC_COH': 'shown by changes in test scores',

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
  'LABEL_GRD': 'growth in test scores',
  'LABEL_COH': 'changes in test scores',
  'LABEL_SEG': 'Segregation Measure',
  'LABEL_SES': 'Socioeconomic Status',
  'LABEL_PCT': 'Percent',

  'LABEL_CONCEPT_AVG': 'community educational opportunity',
  'LABEL_CONCEPT_GRD': 'school-based educational opportunity',
  'LABEL_CONCEPT_COH': 'community educational opportunity changes',

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
  'LABEL_FRL': 'free / reduced lunch program',

  // Gap Labels
  'LABEL_WB': 'Differences between white and Black',
  'LABEL_WH': 'Differences between white and Hispanic',
  'LABEL_WA': 'Differences between white and Asian',
  'LABEL_PN': 'Differences between poor and non-poor',
  'LABEL_MF': 'Differences between male and female',
  'LABEL_GAP': '$[demographic1] and $[demographic2]',

  // Region Labels
  'LABEL_COUNTIES': 'counties',
  'LABEL_DISTRICTS': 'school districts',
  'LABEL_SCHOOLS': 'schools',
  'LABEL_COUNTIES_SINGULAR': 'county',
  'LABEL_DISTRICTS_SINGULAR': 'school district',
  'LABEL_SCHOOLS_SINGULAR': 'school',

  // Explainers
  'EXPLAINER_AVG': 'Shows the set of educational opportunities children have had from birth to the time they take the tests',
  'EXPLAINER_GRD': 'Shows how much students learn on average while they are in school',
  'EXPLAINER_COH': 'Indicates the extent to which a community is getting better at providing educational opportunities over time',
  'EXPLAINER_SES': '',
  'EXPLAINER_SEG': '',

  // Description of metric value for location
  'VALUE_AVG': 'Students score $[amount] grade levels $[aboveBehind] average.',
  'VALUE_GRD': 'Students grow $[amount] grade levels each year.',
  'VALUE_COH': 'Test scores $[risingFalling] $[amount] grade levels over time.',
  'VALUE_SES': '',
  'VALUE_SEG': '',

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
  'TITLE_ACH_GRD': 'Gaps in Growth',
  'TITLE_ACH_COH': 'Gaps in Opportunity Changes',

  // Section Descriptions

  // Scatterplot Titles
  'SP_TITLE_AVG_SES': 'Achievement and Socioeconomic Status',
  'SP_TITLE_AVG_FRL': 'Achievement and % Free or Reduced Lunch Program ',
  'SP_TITLE_GRD_SES': 'Average Growth Per Year and Socioeconomic Status',
  'SP_TITLE_GRD_FRL': 'Average Growth Per Year and % Free or Reduced Lunch Program',
  'SP_TITLE_COH_SES': 'Changes in Achievement and Socioeconomic Status',
  'SP_TITLE_COH_FRL': 'Changes in Achievement and % Free or Reduced Lunch Program',
  
  'OP_TITLE_AVG': 'Achievement Differences Between $[dem1] and $[dem2]',
  'OP_TITLE_GRD': 'Growth Differences Between $[dem1] and $[dem2]',
  'OP_TITLE_COH': 'Change in Achievement Differences Between $[dem1] and $[dem2]',

  // Axis Names
  'AXIS_NAME_FRL_PCT': '% of students qualifying for free or reduced lunch program',
  'AXIS_NAME_SES': '',

  // Axis Labels
  'AXIS_AVG_ZERO': 'average\nperformance',
  'AXIS_AVG_LOW_SINGLE': '$[value] grade\nbehind',
  'AXIS_AVG_LOW': '$[value] grades\nbehind',
  'AXIS_AVG_HIGH_SINGLE': '$[value] grade\nahead',
  'AXIS_AVG_HIGH': '$[value] grades\nahead',

  'AXIS_GRD_ZERO': 'no\ngrowth',
  'AXIS_GRD_LOW_SINGLE': 'learned $[value]\ngrade level',
  'AXIS_GRD_LOW': 'learned $[value]\ngrade levels',
  'AXIS_GRD_HIGH_SINGLE': 'learned $[value]\ngrade level',
  'AXIS_GRD_HIGH': 'learned $[value]\ngrade levels',

  'AXIS_COH_ZERO': 'no change\nin test scores',
  'AXIS_COH_LOW_SINGLE': 'dropped $[value]\ngrade level',
  'AXIS_COH_LOW': 'dropped $[value]\ngrade levels',
  'AXIS_COH_HIGH_SINGLE': 'improved $[value]\ngrade level',
  'AXIS_COH_HIGH': 'improved $[value]\ngrade levels',

  'AXIS_AVG_GAP_ZERO': 'no gap\nin opportunity',
  'AXIS_AVG_GAP_LOW_SINGLE': '$[value] grade level\ndifference',
  'AXIS_AVG_GAP_LOW': '$[value] grade level\ndifference',
  'AXIS_AVG_GAP_HIGH_SINGLE': '$[value] grade level\ndifference',
  'AXIS_AVG_GAP_HIGH': '$[value] grade level\ndifference',

  'AXIS_GRD_GAP_ZERO': 'no\n difference',
  'AXIS_GRD_GAP_LOW': '-$[value] growth gap',
  'AXIS_GRD_GAP_HIGH': '$[value] growth gap',

  'AXIS_COH_GAP_ZERO': 'no\ndifference',
  'AXIS_COH_GAP_LOW': '-$[value]\n trend gap',
  'AXIS_COH_GAP_HIGH': '$[value]\ntrend gap',

  'AXIS_SES_ZERO': 'average socioeconomic status',
  'AXIS_SES_LOW': 'poorer',
  'AXIS_SES_HIGH': 'richer',

  'AXIS_SES_ZERO_GAP': 'no gap in\nsocioeconomic status',
  'AXIS_SES_LOW_GAP': '$[demographic1] richer',
  'AXIS_SES_HIGH_GAP': '$[demographic2] richer',

  'AXIS_SEG_ZERO': 'no\nsegregation',
  'AXIS_SEG_LOW': 'less',
  'AXIS_SEG_HIGH': 'more',

  'AXIS_SEG_ZERO_GAP': 'no gap in\nsegregation',
  'AXIS_SEG_LOW_GAP': 'less',
  'AXIS_SEG_HIGH_GAP': 'more',

  // Intro Section
  'INTRO_TITLE': 'Which measure would you like to explore?',
  'INTRO_DESCRIPTION': 'Using over 330 million test scores across the U.S., we have calculated $[avg], $[grd], and $[coh] to measure educational opportunity.',
  'SEARCH_PLACEHOLDER': 'Find a city, county, district, or school',
  'INTRO_CARD_TITLE_AVG': 'Educational Opportunity',
  'INTRO_CARD_DESCRIPTION_AVG': 'Explore educational opportunity within communities by comparing $[avg] to socioeconomic status and poverty measures',
  'INTRO_CARD_TITLE_GRD': 'School Performance',
  'INTRO_CARD_DESCRIPTION_GRD': 'Explore the quality of education for schools and communities by viewing $[grd] that show how much students are learning each year.',
  'INTRO_CARD_TITLE_COH': 'Changes in Opportunity',
  'INTRO_CARD_DESCRIPTION_COH': 'Explore how opportunity is changing over time in your community by viewing the $[coh] from 2009 - 2016.',
  'INTRO_CARD_HINT': 'OR SCROLL TO START EXPLORING ↓',

  // Map Legend (Mobile)
  'LEGEND_LOW_AVG': 'lower scores',
  'LEGEND_HIGH_AVG': 'higher scores',
  'LEGEND_LOW_GRD': 'less growth',
  'LEGEND_HIGH_GRD': 'more growth',
  'LEGEND_LOW_COH': 'scores dropping',
  'LEGEND_HIGH_COH': 'scores improving',

  'LEGEND_LOW_AVG_GAP': 'smaller gap',
  'LEGEND_HIGH_AVG_GAP': 'larger gap',
  'LEGEND_LOW_GRD_GAP': 'growth gap decreasing',
  'LEGEND_HIGH_GRD_GAP': 'growth gap increasing',
  'LEGEND_LOW_COH_GAP': 'trend gap decreasing',
  'LEGEND_HIGH_COH_GAP': 'trend gap increasing',

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


  'WT_MAP': 'The map shapes show $[region] with colors representing $[metric].',
  'WT_MAP_ZOOMED': 'The dots on the map show schools with colors representing $[metric] for the school.',

  'WT_CHART': 'The chart shows circles for $[region] sized relative to the number of students. Both the position of the circle on the vertical axis and color show their $[metric].',
  'WT_CHART_SES': 'Circles on the left represent an area with lower socioeconomic status where circles on the right correspond to areas with higher socioeconomic status.',


  'WT_CONTEXT_AVG_ALL': ' ',
  'WT_CONTEXT_GRD_ALL': ' ',
  'WT_CONTEXT_COH_ALL': ' ',
  'WT_CONTEXT_AVG_W': 'for white students',
  'WT_CONTEXT_AVG_B': 'for Black students',
  'WT_CONTEXT_AVG_H': 'for Hispanic students',
  'WT_CONTEXT_AVG_A': 'for Asian students',
  'WT_CONTEXT_AVG_M': 'for male students',
  'WT_CONTEXT_AVG_F': 'for female students',
  'WT_CONTEXT_AVG_P': 'for poor students',
  'WT_CONTEXT_AVG_NP': 'for non-poor students',

  'WT_AVG_NONGAP_HIGH': 'average test scores $[demographic] above grade level',
  'WT_AVG_NONGAP_MID': 'average test scores $[demographic] at grade level',
  'WT_AVG_NONGAP_LOW': 'average test scores $[demographic] below grade level',
  'WT_GRD_NONGAP_HIGH': '$[demographic] students learn more than 1 grade level per year',
  'WT_GRD_NONGAP_MID': '$[demographic] students learn about 1 grade level per year',
  'WT_GRD_NONGAP_LOW': '$[demographic] students learn less than 1 grade level per year',
  'WT_COH_NONGAP_HIGH': '$[demographic] students test scores are increasing over time',
  'WT_COG_NONGAP_MID': '$[demographic] students test scores are not changing over time',
  'WT_COH_NONGAP_LOW': '$[demographic] students test scores are decreasing over time',

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



const isStringMatch = (s1, s2) =>
  s1 && s2 && (
    s1.toUpperCase() === s2.toUpperCase() ||
    s1 === '*' || s2 === '*'
  )


const isViewMatch = isStringMatch;
const isRegionMatch = isStringMatch;
const isMetricMatch = isStringMatch;
const isSecondaryMatch = isStringMatch;

const isDemographicMatch = (d1, d2) => (
  (d1 === 'gap' && isGapDemographic(d2)) ||
  (d2 === 'gap' && isGapDemographic(d1)) ||
  (d1 === 'nongap' && !isGapDemographic(d2)) ||
  (d2 === 'nongap' && !isGapDemographic(d1)) ||
  isStringMatch(d1, d2)
)

/**
 * Returns true if the provided key matches the region, 
 * demographic, and type passed
 */
const isKeyMatch = (
  key, 
  { 
    region, 
    demographic, 
    view, 
    metric, 
    secondary = 'ses'
  }
) => {
  if (key === '*') { return true; }
  const [
    contextId,
    viewId,
    regionId,
    metricId,
    secondaryId,
    demographicId
  ] = key.split('_');
  return (
    contextId &&
    isViewMatch(view, viewId) &&
    isRegionMatch(region, regionId) &&
    isMetricMatch(metric, metricId) &&
    isSecondaryMatch(secondary, secondaryId) &&
    isDemographicMatch(demographic, demographicId)
  )
}

/** Checks if the LANG key exists */
const hasLangKey = (key) =>
  LANG.hasOwnProperty(key.toUpperCase())

/**
 * Checks the LANG for any context-specific keys for
 * the provided values.
 */
export const populateContext = (values = {}, prefix) => {
  return Object.keys(values).reduce((obj, key) => ({
    ...obj,
    [key]: prefix && hasLangKey(prefix + '_' + values[key]) ? 
      getLang(prefix + '_' + values[key]) :
        hasLangKey('LABEL_' + values[key]) ? 
          getLang('LABEL_' + values[key]).toLowerCase() :
          values[key]
  }), {})
}

/**
 * Returns an array of paragraphs matching the provided context
 * @param {string} contextPrefix the prefix used in the LANG for this context
 * @param {object} contextValues the values for the current context
 */
export const getLanguageForContext = 
  (contextPrefix, contextValues) =>
    Object.keys(LANG)
      .filter(k => 
        k.startsWith(contextPrefix) && isKeyMatch(k, contextValues)
      )
      .map(k => getLang(k, populateContext(contextValues, contextPrefix)))

/**
 * Takes a text string and injects object keys that
 * match $[key]
 * @param {*} text 
 * @param {*} params 
 */
const interpolate = (text, params = {}) => {
  const arr = splitLang(text);
  return arr.map((a) => {
    if (a && a[0] !== '$') {
      return a
    } else {
      a = a.replace('$[', '')
      a = a.replace(']', '')
      if (params[a]) {
        return params[a]
      }
      return a
    }
  }).join('')
}

/**
 * Gets the language string for the given key and data
 * @param {string} key 
 * @param {object} props 
 */
export const getLang = (key = '', props = {}) => {
  key = key.toUpperCase();
  if (!LANG[key]) { return key }
  return Object.keys(props).length > 0 ?
    interpolate(LANG[key], props) :
    LANG[key]
}

/**
 * Gets the label for the provided metric ID
 * @param {string} id 
 * @return {string}
 */
export const getLabel = (id) => {
  return getLang('LABEL_' + id.toUpperCase());
}

/** Split a lang string at the vars formatted as $[var] */
export const splitLang = (text) =>
  text.split(/(\$\[[a-zA-Z0-9_]*\])/)


// TAKEN OUT JUNE 11.  Only used in intro, and probably a
//    a better way.
//
// /**
//  * Gets the language and inserts components for the
//  * matching keys in the components object.
//  * e.g. if the lang is "Select a $[button]" and `components`
//  *  has { button: <Button /> }, it will return an array with
//  *    [ "Select a ", <Button /> ]
//  */
// export const getLangWithComponents = (key, components) => {
//   const arr = splitLang(getLang(key));
//   return arr.map((a) => {
//     if (a && a[0] !== '$') {
//       return a
//     } else {
//       a = a.replace('$[', '')
//       a = a.replace(']', '')
//       if (components[a]) {
//         return components[a]
//       }
//       return a;
//     }
//   })
// }
