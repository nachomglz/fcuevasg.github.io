import React, { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import axios from "axios"
import { Team } from "../../components/interfaces/Interfaces"
import { MeetingType, MeetingConfig } from "../../components/interfaces/Interfaces"
import { MongoObjectId } from "../../components/interfaces/Interfaces"

type RouteParams = {
  team_id?: string
}

const AskMeetingType: React.FC<{}> = () => {
  const navigate = useNavigate()
  const { team_id } = useParams<RouteParams>()
  const [team, setTeam] = useState<Team>()
  const [title, setTitle] = useState<string>("Selecciona el tipo de meeting")
  const [meetingType, setMeetingType] = useState<MeetingType>();
  const [meetingConfigId, setMeetingConfigId] = useState<string>()
  const [meetingConfigList, setMeetingCofigList] = useState<MeetingConfig[]>([]);

  useEffect(() => {
    if (team_id) {
      axios.get(`http://localhost:8000/api/team/${team_id}`)
        .then(({ data: _team }) => {
          if (_team) {
            setTeam(_team)
          } else {
            navigate("/teams")
          }
        }
        ).catch(_err => {
          navigate("/teams")
        })
    } else {
      navigate("/teams")
    }
  }, [])

  const selectType = (type: MeetingType) => {
    setMeetingType(type)

    // get all the meeting configs
    axios.get(`http://localhost:8000/api/meeting_config/team/${team_id}`)
      .then(({ data: configs }) => {
        if (configs.length > 0) {
          setTitle('Selecciona una configuracion para este meeting')
          setMeetingCofigList(configs)
        }
      })
  }

  const selectConfig = (config: MongoObjectId) => {
    // create a new meeting with that config and navigate to meeting screen
  }


  return <>
    <div>
      team: {team?.name}
    </div>
    <div>
      <h2>{title}</h2>
      {meetingConfigList.length > 0 ? (
        <div className="meeting-config-list">
          {meetingConfigList.map((config, index) => (
            <button className="meeting-config-list-item" key={index} onClick={() => selectConfig(config._id)}>
              {config.config_name}
            </button>
          ))}
        </div>
      ) : (
        <>
          <button onClick={() => selectType("DAILY")}>DAILY</button>
          <button onClick={() => selectType("RETRO")}>RETRO</button>
        </>
      )}

    </div>
  </>
}

export default AskMeetingType
