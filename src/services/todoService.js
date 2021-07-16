import {API, Auth} from "aws-amplify"

const todoService = {}
const path = "/task"

todoService.postAdd = async function (operand1, operand2) {
  // const user = await Auth.currentAuthenticatedUser()
  // const token = user.signInUserSession.idToken.jwtToken
  const options = {
    Headers:
    {
      // Authorization: token
    },
    body: {
      operand1,
      operand2
    }
  }
  debugger // eslint-disable-line no-debugger
  try{
  const response = await API.post("ApiGate","/task/add", options)
  debugger // eslint-disable-line no-debugger

  return response
  } catch(error){
    debugger // eslint-disable-line no-debugger
    console.error(error)
    return {error, status:500}
  }
  
}


todoService.postTasks = async function (item) {
  debugger // eslint-disable-line no-debugger
  const currentSession = await Auth.currentSession()
  debugger // eslint-disable-line no-debugger
  const token = currentSession.getIdToken().getJwtToken()
  debugger // eslint-disable-line no-debugger
  const options = {
    headers:
    {
      Authorization: token
    },
    body:{
      description: item.description,
      done: item.done,
      responsible: item.responsible
    }
  }
  debugger // eslint-disable-line no-debugger
  try{
  const response = await API.post("ApiGate",path, options)
  debugger // eslint-disable-line no-debugger
  return response
  } catch(error){
    console.error(error)
    debugger // eslint-disable-line no-debugger
    return {error, status:500}
  }
}
todoService.updateTasks = async function (item) {
  const user = await Auth.currentAuthenticatedUser()
  const token = user.signInUserSession.idToken.jwtToken
  const options = {
    Headers:
    {
      Authorization: token
    },
    body:{
      description: item.description,
      done: item.done,
      responsible: item.responsible
    }
  }
  try{
  const response = await API.put("ApiGate",`${path}/${item.id}`, options)
  return response
  } catch(error){
    console.error(error)
    return {error, status:500}
  }
}

todoService.getTasks = async function () {
  const currentSession = await Auth.currentSession()
  const token = currentSession.getIdToken().getJwtToken()
  const options = {
    headers:
    {
      Authorization: token
    }
  }
  try{
  const response = await API.get("ApiGate",path, options)
  return response
  } catch(error){
    console.error(error)
    return {error, status:500}
  }
  
}
todoService.deleteTasks = async function (id) {
  const user = await Auth.currentAuthenticatedUser()
  const token = user.signInUserSession.idToken.jwtToken
  const options = {
    Headers:
    {
      Authorization: 'Bearer '+ token
    }
  }
  try{
  const response = await API.del("ApiGate",`${path}/${id}`, options)
  return response
  } catch(error){
    console.error(error)
    return {error, status:500}
  }
  
}
export default todoService