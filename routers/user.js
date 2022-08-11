const { Router } = require('express')
const router = Router()

// User routes
// TODO: During login there should be id returned and saved some where
// to ease the user account search
/**
 * Get my account info
 */
router.get('/get-my-account', async (req, res) => {
  res.send('jestem')
})

/**
 * Get booked flights (MORE THEN ONE)
 */
router.get('/get-my-flights', async (req, res) => {})

/**
 * Create account
 */
router.post('', async (req, res) => {})

/**
 * Edit account
 */
router.put('/edit-account', async (req, res) => {})

/**
 * Delete account
 */
router.delete('/delete', async (req, res) => {})

//------------------------

// Admin routes

// FORMAT: user?id=id

/**
 * Get user account
 */
router.get('', async (req, res) => {})

/**
 * Edit user account
 */
router.put('', async (req, res) => {})

/**
 * Delete user account
 */
router.delete('', async (req, res) => {})

module.exports = router
