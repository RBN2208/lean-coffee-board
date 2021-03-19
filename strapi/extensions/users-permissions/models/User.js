module.exports = {
  /**
   * Triggered before user creation.
   */
  lifecycles: {
    async beforeCreate(data) {
      data.color = `hsl(${Math.round(Math.random() * 360)}deg, 50%, 50%)`
    },
  },
}
