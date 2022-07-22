
const urlAPI = 'https://fg-newdev.herokuapp.com'

async function getCourses(){  
  const response = await fetch(`${urlAPI}/courses`, {
    method: 'POST',
    body: {
      teste: 'valor'
    }
  })


    const dataJson = await response.json()
  console.log(dataJson)
}
getCourses()