

export const getMessage = async (req, res) => {
  try {
    res.json({message: 'hello world!!!'})
    console.log('hello world')
  } catch (error) {
    console.log(error)
  }
}