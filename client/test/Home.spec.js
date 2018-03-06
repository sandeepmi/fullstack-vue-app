import { shallow } from '@vue/test-utils'
import Home from '../src/components/Home.vue'

describe('Home.vue', () => {
  it('should render h1', () => {
    const wrapper = shallow(Home)
    expect(wrapper.find('h1').text()).toMatch('Home')
  })
})
