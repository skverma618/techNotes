const User = require('../models/User');
const Note = require('../models/Note');

const asyncHandler = require('express-async-handler'); // will prevent us from many try catch blovks as we will se multiple async awits in our code
const bcrypt = require('bcrypt');
// asyncHandler is tobe wrapped around async function, it will catch all the errors and pass it to the errorHandler middleware


// @desc    Get all users   
// @route   GET /users
// @access  Private

const getAllUsers = asyncHandler(async (req, res) => {
    const users = await User.find().select('-password').lean() // lean() will convert the mongoose object to plain js object
    if(!users?.length){
        return res.status(400).json({message: 'No users found'})
    }
    res.status(200).json(users)
})

// @desc    create a user
// @route   POST /users
// @access  Private

const createNewUser = asyncHandler(async (req, res) => {
    const {username, password, roles} = req.body
    
    //confirm data
    if(!username || !password || !Array.isArray(roles) || roles.length === 0){
        console.log(req.body)
        return res.status(400).json({message: 'all fields are required'})
    }

    // check for duplicates
    const duplicate = await User.findOne({username}).lean().exec() //exec() - if you pass some data, you should use exec() as suggested by the official documentation
    if(duplicate){
        return res.status(409).json({message: 'username already exists'}) // 409 is for conflict
    }

    // HASH THE PASSWORD
    const hashedpswd = await bcrypt.hash(password, 10) // 10 is the salt rounds

    const userObject = {
        username,
        password: hashedpswd,
        roles
    }

    // create a new user
    const newUser = await User.create(userObject)

    if(!newUser){
        return res.status(400).json({message: 'something went wrong'})
    }else{
        res.status(201).json({message: 'user created successfully', data: newUser})
    }
})

// @desc Update a user
// @route PATCH /users
// @access Private
const updateUser = asyncHandler(async (req, res) => {
    const { id, username, roles, active, password } = req.body

    // Confirm data 
    if (!id || !username || !Array.isArray(roles) || !roles.length || typeof active !== 'boolean') {
        return res.status(400).json({ message: 'All fields except password are required' })
    }

    // Does the user exist to update?
    const user = await User.findById(id).exec()

    if (!user) {
        return res.status(400).json({ message: 'User not found' })
    }

    // Check for duplicate 
    const duplicate = await User.findOne({ username }).lean().exec() // lean gives just json format of the data, we will not be able to perform functions suc as save on this

    // Allow updates to the original user 
    if (duplicate && duplicate?._id.toString() !== id) {
        return res.status(409).json({ message: 'Duplicate username' })
    }

    user.username = username
    user.roles = roles
    user.active = active

    if (password) {
        // Hash password 
        user.password = await bcrypt.hash(password, 10) // salt rounds 
    }

    const updatedUser = await user.save()

    res.json({ message: `${updatedUser.username} updated` })
})

// @desc Delete a user
// @route DELETE /users
// @access Private
const deleteUser = asyncHandler(async (req, res) => {
    const { id } = req.body

    // Confirm data
    if (!id) {
        return res.status(400).json({ message: 'User ID Required' })
    }

    // Does the user still have assigned notes?
    const note = await Note.findOne({ user: id }).lean().exec()
    if (note) {
        return res.status(400).json({ message: 'User has assigned notes' })
    }

    // Does the user exist to delete?
    const user = await User.findById(id).exec()

    if (!user) {
        return res.status(400).json({ message: 'User not found' })
    }

    const result = await user.deleteOne()

    const reply = `Username ${result.username} with ID ${result._id} deleted`

    res.json(reply)
})

module.exports = {
    getAllUsers,
    createNewUser,
    updateUser,
    deleteUser
}