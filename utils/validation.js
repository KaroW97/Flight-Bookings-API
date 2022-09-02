exports.checkIfRankChanged = (newRank, currentRank) => {
  if (newRank === currentRank)
    throw new Error('Ticket rank is the same as previous')
}
