/**
 * Created by mas on 2017/11/20.
 */
export const listerBack = {
  created () {
    this.$backbutton._lister('clickBack', () => {
      if (this.showFlag) {
        this.hide()
        return false
      }
      return true
    })
  }
}
