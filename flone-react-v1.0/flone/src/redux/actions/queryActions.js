export const UPDATE_QUERY = "UPDATE_QUERY"
export const RESET_QUERY = "RESET_QUERY"

export const updateQuery = (field, value) => dispatch =>  {
  console.log("from action", field, value)
  try {
    dispatch({
      type:UPDATE_QUERY,
      payload: {
        field, value
      }
    })
  } catch (error) {
    console.log(error)
  }
}

export const resetQuery = () => dispatch =>  {
  console.log("RESET QUERY")
  try {
    dispatch({
      type:RESET_QUERY,
      payload: {}
    })
  } catch (error) {
    console.log(error)
  }
}