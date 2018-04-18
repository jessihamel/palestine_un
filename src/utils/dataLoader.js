import { csv } from 'd3-fetch'
import { nest } from 'd3-collection'
import { getColorFromIndex } from '../utils/colors'

import adolescentGirlsData from '../data/adolescentGirls.csv'
import childrenInLaborData from '../data/childrenInLabor.csv'
import personsWithDisabilitiesData from '../data/personsWithDisabilities.csv'
import theElderlyData from '../data/theElderly.csv'

class DataLoader {
  constructor() {
    this.data = [
      {
        key: 'adolescentGirls',
        slug: 'Adolescent Girls',
        data: null
      },
      {
        key: 'childrenInLabor',
        slug: 'Children In Labor',
        data: null
      },
      {
        key: 'personsWithDisabilities',
        slug: 'Persons With Disabilities',
        data: null
      },
      {
        key: 'theElderly',
        slug: 'The Elderly',
        data: null
      }
    ]
  }

  loadData() {
    return new Promise((resolve, reject) => {
      const dataFiles = [
        adolescentGirlsData,
        childrenInLaborData,
        personsWithDisabilitiesData,
        theElderlyData,
      ]
      Promise.all(
        dataFiles.map(file => {
          return csv(file)
        })
      ).then((results) => {
        this.data.forEach((d, i) => this.data[i].data = results[i])
        this.data.forEach(d => {
          d.groupLength = d.data.length
          d.nestedArray = this.getMiniGraphTopics(d.key).map(topic => {
            let nested = nest()
              .key(e => e[topic.key])
              .entries(d.data)
            // add colors
            nested
              .sort((a, b) => b.values.length - a.values.length)
              .forEach((d, i) => d.color = getColorFromIndex(i))
            // sort by nValues
            nested = nested.sort((a, b) => b.values.length - a.values.length)
            return {
              topicData: topic,
              nested
            }
          })
          d.nestedHash = {}
          d.nestedArray.forEach(t => {
            d.nestedHash[t.topicData.key] = t
          })
        })
        resolve()
      })
    })
  }

  getData() {
    return this.data
  }

  getGroupDataset(selected) {
    return this.data.find(d => d.key === selected)
  }

  parseFilter(selectedFilter) {
    return selectedFilter.split(/\s-\s(.+)/)
  }

  filterNested(nested, selectedFilter) {
    if (selectedFilter === 'None') {
      return nested
    }
    const parsedFilter = this.parseFilter(selectedFilter)
    const keyValue = parsedFilter[0]
    const filter = parsedFilter[1]
    return nested.map(d => {
      return {
        key: d.key,
        color: d.color,
        values: d.values.filter(value => value[keyValue] === filter)
      }
    })
  }

  getFilteredLength(selectedDataset, selectedFilter) {
    if (selectedFilter === 'None') {
      return selectedDataset.groupLength
    }
    const parsedFilter = this.parseFilter(selectedFilter)
    const keyValue = parsedFilter[0]
    const filter = parsedFilter[1]
    return selectedDataset.nestedHash[keyValue].nested.find(d => d.key === filter).values.length
  }

  getMiniGraphTopics(selected) {
    switch (selected) {
      case 'adolescentGirls':
        return [
          {
            key: 'gazaOrWestBank',
            slug: 'Gaza Or West Bank'
          },
          // {
          //   key: 'location',
          //   slug: 'Location'
          // },
          {
            key: 'age',
            slug: 'Age'
          },
          {
            key: 'education',
            slug: 'Education'
          },
          {
            key: 'illiterateReason',
            slug: 'If you were illiterate, or received pre-secondary education due to'
          },
          {
            key: 'address',
            slug: 'Address'
          },
          {
            key: 'schoolLeakage',
            slug: 'Is there a school leakage in your area?'
          },
          {
            key: 'workingStatus',
            slug: 'Working Status'
          },
          {
            key: 'socialStatus',
            slug: 'Social Status'
          },
          {
            key: 'ageOfMarriage',
            slug: 'What is the suitable age for marriage?'
          },
          {
            key: 'reasonOfMarriage',
            slug: 'If you were married that was because of'
          },
          {
            key: 'pregnant',
            slug: 'Are you pregnant?'
          },
          {
            key: 'disability',
            slug: 'Do you suffer from any disability?'
          },
          {
            key: 'typeOfDisability',
            slug: 'What type of disability?'
          },
          {
            key: 'livingWithFamily',
            slug: 'Do you live with family?'
          },
          {
            key: 'whereDoYouLive',
            slug: 'If not with family, where do you live?'
          },
          {
            key: 'whyLivingOutsideFamily',
            slug: 'Reasons for living outside the family house'
          }
        ]
      case 'childrenInLabor':
        return [
          {
            key: 'gazaOrWestBank',
            slug: 'Gaza Or West Bank'
          },
          // {
          //   key: 'location',
          //   slug: 'Location'
          // },
          {
            key: 'gender',
            slug: 'Gender'
          },
          {
            key: 'age',
            slug: 'Age'
          },
          {
            key: 'education',
            slug: 'Education'
          },
          {
            key: 'statusOfAsylum',
            slug: 'Status Of Asylum'
          },
          {
            key: 'illiteracyReason',
            slug: 'If you were illiterate, or received pre-secondary education due to'
          },
          {
            key: 'socialStatus',
            slug: 'Social Status'
          },
          {
            key: 'address',
            slug: 'Address'
          },
          {
            key: 'doYouLiveWith',
            slug: 'Do you live...?'
          },
          {
            key: 'orphan',
            slug: 'Are you an orphan?'
          },
          {
            key: 'incomeProvider',
            slug: 'Who is the main income provider of the family'
          },
          {
            key: 'HowDoyouSpendFreeTime',
            slug: 'How do you spend your free time?'
          },
          {
            key: 'typeOfWork',
            slug: 'Type Of Work'
          },
          {
            key: 'reasonOfWork',
            slug: 'Reason Of Work'
          },
          {
            key: 'numberOfFamilyMembers',
            slug: 'Number Of Family Members'
          },
          {
            key: 'workingHoursPerWeek',
            slug: 'Working Hours Per Week'
          },
          {
            key: 'formOfWork',
            slug: 'Form Of Work'
          },
          {
            key: 'dailyIncome',
            slug: 'Daily Income'
          },
          {
            key: 'howMuchDoYouGiveFamily',
            slug: 'How much do you give your family?'
          },
        ]
      case 'personsWithDisabilities':
        return [
          {
            key: 'gazaOrWestBank',
            slug: 'Gaza Or West Bank'
          },
          // {
          //   key: 'location',
          //   slug: 'Location'
          // },
          {
            key: 'gender',
            slug: 'Gender'
          },
          {
            key: 'age',
            slug: 'Age'
          },
          {
            key: 'education',
            slug: 'Education'
          },
          {
            key: 'illiteracyReason',
            slug: 'If you were illiterate, or received pre-secondary education due to'
          },
          {
            key: 'address',
            slug: 'Address'
          },
          {
            key: 'typeOfDisability',
            slug: 'Type Of Disability'
          },
          {
            key: 'doYouHaveAccessToSupport',
            slug: 'If you have mobility impairment, Do you have access to the support you need...?'
          },
          {
            key: 'workingStatus',
            slug: 'Working Status'
          },
          {
            key: 'difficultyReachingHealthFacilities',
            slug: 'Do you have difficulties reaching health facilities?'
          },
          {
            key: 'healthInsurance',
            slug: 'Do you have health insurance?'
          },
          {
            key: 'typeOfInsurance',
            slug: 'If you have health insurance, what type of insurance?'
          },
          {
            key: 'reasonOfDisability',
            slug: 'Reason Of Disability'
          },
          {
            key: 'haveYouBeenAbused',
            slug: 'Have you been abused due to your disability?'
          },
        ]
      case 'theElderly':
        return [
          {
            key: 'gazaOrWestBank',
            slug: 'Gaza Or West Bank'
          },
          // {
          //   key: 'location',
          //   slug: 'Location'
          // },
          {
            key: 'gender',
            slug: 'Gender'
          },
          {
            key: 'age',
            slug: 'Age'
          },
          {
            key: 'address',
            slug: 'Address'
          },
          {
            key: 'residence',
            slug: 'Residence'
          },
          {
            key: 'socialStatus',
            slug: 'Social Status'
          },
          {
            key: 'workingStatus',
            slug: 'Working Status'
          },
          {
            key: 'sourceOfIncome',
            slug: 'Sourch Of Income'
          },
          {
            key: 'retirementType',
            slug: 'Retirement Type'
          },
          {
            key: 'howDoYouSpendFreeTime',
            slug: 'If you are unemployed, how do you spend your free time?'
          },
          {
            key: 'healthInsurance',
            slug: 'Do you have health insurance?'
          },
          {
            key: 'typeOfInsurance',
            slug: 'If you have health insurance, what type of insurance?'
          },
          {
            key: 'chronicDiseases',
            slug: 'Do you have chronic diseases?'
          },
          {
            key: 'disability',
            slug: 'Do you suffer from a disability?'
          },
          {
            key: 'typeOfDisability',
            slug: 'If you have a disability, what type of disability?'
          },
        ]
      default:
        return []
    }
  }
}

export const dataLoader = new DataLoader()
