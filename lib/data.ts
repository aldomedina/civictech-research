import { TPlatform } from '@/types'
import { platform } from 'os'

const multiScenario = [
  'You are tasked with organizing a citizen jury for the Scottish Government to address the critical issue of AI regulation in Scotland. As a participation designer, your goal is to engage a diverse group of citizens, providing them with the tools and knowledge necessary to deliberate on this complex subject and offer informed recommendations.',
  'The Scottish Government, in its participation quality framework, has already defined all the necessary steps involved in setting up a robust deliberative process. Your first step is to identify the best Civic Tech platform that will support your mission.',
  'Your mission is to decide which tool best serves you in taking the steps defined by the quality framework and how the features of these tools could help you with each of them.',
]

const toolScenario = [
  'You are tasked with organizing a citizen jury for the Scottish Government to address the critical issue of AI regulation in Scotland. As a participation designer, your goal is to engage a diverse group of citizens, providing them with the tools and knowledge necessary to deliberate on this complex subject and offer informed recommendations.',

  'You already designed most of the process, but you are missing support to design how to let citizens ideate proposals and select them themselves.',

  'The Scottish Government in its participation quality framework has already defined all the necessary steps involved in setting up a robust deliberative process. Your first step is to identify the best Civic Tech platform that will support your mission.',

  'Your mission is to decide which tool better serves you in taking the steps defined by the quality framework and how the features of the tools could help you for each of them.',
]

export const getScenario = (platformName: TPlatform) =>
  ({
    decidim: multiScenario,
    loomio: multiScenario,
    polis: toolScenario,
    considerit: toolScenario,
  })[platformName]

export const getDescription = (platformName: TPlatform) =>
  ({
    decidim:
      'Decidim is an open-source civic tech platform designed for participatory democracy. It is based in Catalonia. It offers a wide array of tools to support public engagement, including forums, surveys, participatory budgeting, and collaborative proposal development. Decidim is highly customizable.',
    loomio:
      'Loomio is an open-source platform, often offered through paid plans, based in New Zealand. It is highly customizable and focuses in facilitating proposal generation and gathering feedback. It is used both by communities and businesses.',
    polis:
      'Pol.is is civic tech platform designed to facilitate large-scale deliberation and consensus-building. It leverages AI to analyse open-ended comments and group participants based on shared opinions, enabling real-time visualization of diverse viewpoints and areas of agreement.',
    considerit:
      'Consider.it is a civic tech platform focused on asynchronous commenting and weighting ideas. Participants can see the range of perspectives, identify common ground, and understand the reasoning behind different viewpoints.',
  })[platformName]
