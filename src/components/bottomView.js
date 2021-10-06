import React, { useEffect, useState } from 'react'
import moment from 'moment'
import { callImageOcrUploadApi, callJourneyStartApi } from '../utils/api'
import './styles.scss'

/**
 *
 * @param {funtion} props.updateGameState is used to propagate data out of the component to
 * parent game state
 * @param {boolean} props.data.isOnGuardPost is character intersecting the guard post
 * @param {boolean} props.data.isInBarArea is character intersecting the bar
 * @param {boolean} props.data.isInSmokingArea is character intersecting tsmokers lounge
 * @param {boolean} props.data.isFixed is character fixed with no movement allowed
 * @param {boolean} props.data.isWithAgent is character intersecting with agent
 * @param {boolean} props.data.isDoghConvo is character intersecting with dogh man
 */

const BottomView = props => {
  const {
    data: {
      isOnGuardPost,
      isOnSoupArea,
      isOnStarterArea,
      isOnMainCourseArea,
      isOnDessertArea,
      isInBarArea,
      isInSmokingArea,
      isNearAgent,
      didDrink,
      didSmoke,
      isWithAgent,
      didFriendTalk,
      isDoghConvo
    },
    updateGameState
  } = props

  useEffect(() => updateNarrative(), [
    isOnGuardPost,
    isInBarArea,
    isInSmokingArea,
    isOnSoupArea,
    isOnStarterArea,
    isOnMainCourseArea,
    isOnDessertArea,
    isNearAgent,
    isWithAgent,
    isDoghConvo
  ])

  useEffect(() => pushToNarrative(), [didSmoke, didDrink, didFriendTalk])


  const [narrativeDialogs, setNarrativeDialogs] = useState([])
  const [isSalary, setIsSalary] = useState('')

  const [policyData, setPolicyData] = useState({
    gender: 'Male',
    dob: '',
    name: '',
    smoker: false,
    age: 26
  })

  const handleIDUpload = async event => {
    setNarrativeDialogs([...narrativeDialogs, 'You handover your ID'])

    const file = event.target.files[0]
    let payload = new FormData()
    payload.append('image_type', 'aadhaar_front')
    payload.append('image', file)
    payload.append('source', 'camera')
    const {
      status,
      data: { data }
    } = await callImageOcrUploadApi(payload)
    if (status === 200) {
      setNarrativeDialogs([
        ...narrativeDialogs,
        'You handover your ID',
        'The guard looks at you and your ID then hands it back to you',
        'You are more than 18 year old, you can enter the bar'
      ])
      const { gender, name } = data
      let { dob } = data
      dob = moment(dob, 'DD/MM/YYYY').format('YYYY-MM-DD').toString()

      const age = moment().diff(dob, 'years')

      updateGameState('isFixed', false)

      setPolicyData({
        ...policyData,
        dob,
        age,
        soup: 1,
        starter: 1,
        gender: gender === 'MALE' ? 'Male' : 'Female',
        name
      })
      const res = await callJourneyStartApi({ name, dob, gender })
      if (res.status === 200) {
        sessionStorage.setItem('journeyId', res?.data?.data?.id)
      }

      setPolicyData({
        ...policyData,
        dob,
        age,
        soup: 1,
        starter: 1,
        gender: gender === 'MALE' ? 'Male' : 'Female',
        name
      })
    }
  }

  const handlePass = async () => {
    setNarrativeDialogs([...narrativeDialogs, 'You told the manager about your pass number'])

    const mainCourse = '32131222'
    setNarrativeDialogs([
      ...narrativeDialogs,
      'You told managerad your pass number',
      'Thanks sir, you can move ahead'
    ])
    handlePDChange({ target: { name: 'mainCourse', value: mainCourse } })
    updateGameState('isFixed', false)
  }
  const handlePDChange = event => {
    const { name, value } = event.target
    setPolicyData({ ...policyData, [name]: value })
  }

  const getActionables = () => {
    if (isOnGuardPost) {
      return (
        <>
          <button className='upload-btn'>
            Upload Your ID
            <input type='file' onChange={handleIDUpload} />
          </button>
        </>
      )
    } else if (isInBarArea) {
      return (
        <>
          {didDrink === undefined ? (
            <>
              <div>Will you have a drink:</div>
              <div>
                <button
                  onClick={() => {
                    updateGameState('didDrink', true)
                    updateGameState('isFixed', false)
                  }}
                >
                  Yes
                </button>
                <button
                  onClick={() => {
                    updateGameState('didDrink', false)
                    updateGameState('isFixed', false)
                  }}
                >
                  No
                </button>
              </div>
            </>
          ) : (
            <div>You came here for a drink before</div>
          )}
        </>
      )
    } else if (isInSmokingArea) {
      return (
        <>
          {didSmoke === undefined ? (
            <>
              <div>Will you have a smoke:</div>
              <div>
                <button
                  onClick={() => {
                    updateGameState('didSmoke', true)
                    updateGameState('isFixed', false)
                  }}
                >
                  Yes
                </button>
                <button
                  onClick={() => {
                    updateGameState('didSmoke', false)
                    updateGameState('isFixed', false)
                  }}
                >
                  No
                </button>
              </div>
            </>
          ) : (
            <div>You came here for a smoke before</div>
          )}
        </>
      )
    } else if (isOnSoupArea) {
      return (
        <>
          <div>Please enter how many soup you want:</div>
          <div>
            <input name='soup' value={1} onChange={handlePDChange} />
            <button>Submit</button>
          </div>
        </>
      )
    } else if (isOnStarterArea) {
      return (
        <>
          <div>How many starter you need:</div>
          <div>
            <input name='starter' value={2} onChange={handlePDChange} />
          </div>
        </>
      )
    } else if (isOnMainCourseArea) {
      return (
        <>
          <div>Please tell me how many main course you need:</div>
          <div>
            <input name='mainCourse' value={2} onChange={handlePDChange} />
          </div>
        </>
      )
    } else if (isOnDessertArea) {
      return (
        <>
          <div>How many Dessets:</div>
          <div>
            <input name='dessert' value={1} onChange={handlePDChange} />
          </div>
        </>
      )
    } else if (isNearAgent) {
      return (
        <>
          <div>Bar staff interacted with you</div>
          <div>
            Sir, accoring to your choices your final bill is : {3928} rs,
            <span
              style={{ textDecoration: 'underline' }}
              onClick={() => {
                window.open('https://github.com/ashishssoni')
              }}
            >
              {' '}
              Click here{' '}
            </span>
            to pay the bill.
          </div>
        </>
      )
    } else if (isWithAgent) {
      return (
        <>
          <div>Welcome Sir to the buffet area, can you tell me your pass number</div>
          <div>
            <input type='text' id='passNo' name='passNo' value={isSalary} onChange={e => setIsSalary(e.target.value)} />
            <button onClick={handlePass}>Submit</button>
          </div>
        </>
      )
    } else if (isDoghConvo) {
      return (
        <>
          {didFriendTalk === undefined ? (
            <>
              <div>Hey, Long time no see. How you have been? all good?:</div>
              <div>
                <button
                  onClick={() => {
                    updateGameState('didFriendTalk', true)
                    updateGameState('isFixed', false)
                  }}
                >
                  Yes
                </button>
                <button
                  onClick={() => {
                    updateGameState('didFriendTalk', false)
                    updateGameState('isFixed', false)
                  }}
                >
                  No
                </button>
              </div>
            </>
          ) : (
            <div>You already talked to your friend.</div>
          )}
        </>
      )
    }
  }

  const pushToNarrative = () => {
    const narr = [...narrativeDialogs]
    if (didSmoke) {
      narr.push('You smoke and relax in the lounge')
    } else if (didDrink) {
      narr.push('You have a drink on the bar')
    } else if (didFriendTalk) {
      narr.push('You have a coversation with your friend')
    }
    setNarrativeDialogs(narr)
  }

  const updateNarrative = () => {
    if (isOnGuardPost) {
      updateGameState('isFixed', true)
      return setNarrativeDialogs([
        ...narrativeDialogs,
        'You approach the building.',
        'A security guard stops you and asks for your ID'
      ])
    } else if (isInBarArea) {
      if (didDrink === undefined) {
        updateGameState('isFixed', true)
      }
      return setNarrativeDialogs([...narrativeDialogs, 'You come to the bar'])
    } else if (isInSmokingArea) {
      if (didSmoke === undefined) {
        updateGameState('isFixed', true)
      }
      return setNarrativeDialogs([...narrativeDialogs, 'You come to the smoking area'])
    } else if (isOnSoupArea) {
      return setNarrativeDialogs([
        'You can select varitey of sour here',
        ...narrativeDialogs
      ])
    } else if (isOnStarterArea) {
      return setNarrativeDialogs([
        ...narrativeDialogs,
        'You can select various range of starter here',
      ])
    } else if (isOnMainCourseArea) {
      return setNarrativeDialogs([
        'You can select your main course here',
        ...narrativeDialogs
      ])
    } else if (isOnDessertArea) {
      return setNarrativeDialogs([
        ...narrativeDialogs,
        'We have delicious desserts here'
      ])
    } else if (isWithAgent) {
      updateGameState('isFixed', true)
      return setNarrativeDialogs([...narrativeDialogs, 'You meet the manager of bar'])
    } else if (isDoghConvo) {
      if (didFriendTalk === undefined) {
        updateGameState('isFixed', true)
      }
      return setNarrativeDialogs([...narrativeDialogs, 'You meet one of your friend'])
    }
  }

  return (
    <>
      <div className='section'>
        <div className='heading'>Actions</div>
        <div className='actionables'>{getActionables()}</div>
      </div>
      <div className='section'>
        <div className='heading'>Narrative</div>
        <div className='content'>
          {narrativeDialogs.reverse().map((dialog, idx) => (
            <div className='dialog' key={idx}>
              {dialog}
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default BottomView
