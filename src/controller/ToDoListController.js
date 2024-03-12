const ToDoModel = require('../model/ToDoListModel')

exports.create = async (req, res) => {
  try {
    let email = req.headers['email']
    let reqBody = req.body
    reqBody.email = email
    await ToDoModel.create(reqBody)
    res.json({ status: 'success', message: 'Create Completed' })
  } catch (err) {
    res.json({ status: 'fail', message: err })
  }
}

exports.update = async (req, res) => {
  try {
    let email = req.headers['email']
    let { id } = req.params
    let reqBody = req.body
    await ToDoModel.updateOne({ _id: id, email: email }, reqBody)
    res.json({ status: 'success', message: 'Update Completed' })
  } catch (err) {
    res.json({ status: 'fail', message: err })
  }
}

exports.read = async (req, res) => {
  try {
    let email = req.headers['email']
    let data = await ToDoModel.find({ email: email })
    res.json({ status: 'success', data: data })
  } catch (err) {
    res.json({ status: 'fail', message: err })
  }
}

exports.delete = async (req, res) => {
  try {
    let email = req.headers['email']
    let { id } = req.params
    await ToDoModel.deleteOne({ _id: id, email: email })
    res.json({ status: 'success', message: 'Delete Completed' })
  } catch (err) {
    res.json({ status: 'fail', message: err })
  }
}
