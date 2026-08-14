import { Switch, Route } from 'react-router-dom'
import HomePage from '../pages/HomePage'
import ShopPage from '../pages/ShopPage'

function PageContent() {
  return (
    <main className="flex flex-1 flex-col">
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/shop" component={ShopPage} />
      </Switch>
    </main>
  )
}

export default PageContent
