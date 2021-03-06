import React, { Component } from 'react'

import Button from '../../components/Button/Button'
import ExpirationDetails from '../../components/ExpirationDetails'
import SwapPairPanel from '../../components/SwapPairPanel/SwapPairPanel'
import HandshakeIcon from '../../icons/handshake.png'
import SwapIcon from '../../icons/switch.svg'
import CounterPartyWallets from '../CounterPartyWallets'
import CurrencyInputs from '../CurrencyInputs'
import InitiatorExpirationInfo from '../InitiatorExpirationInfo'
import WalletPanel from '../WalletPanel'
import './SwapInitiation.css'
import { getInitiationErrors } from '../../utils/validation'
import { APP_BASE_URL } from '../../utils/app-links'

class SwapInitiation extends Component {
  render () {
    const errors = getInitiationErrors(this.props.transactions, this.props.expiration, this.props.isVerified, this.props.isPartyB)

    return <div className='SwapInitiation'>
      <SwapPairPanel
        haveCurrency={this.props.assets.a.currency}
        wantCurrency={this.props.assets.b.currency}
        icon={this.props.isPartyB ? undefined : SwapIcon}
        onIconClick={() => this.props.switchSides()} />
      <div className='SwapInitiation_top'>
        <CurrencyInputs disabled={this.props.isPartyB} showRate />
      </div>
      <WalletPanel />
      <div className='SwapInitiation_bottom'>
        { this.props.isPartyB
          ? <span className='SwapInitiation_handshake'><img src={HandshakeIcon} alt='Agree' /></span>
          : <h5 className='SwapInitiation_counterPartyLabel'>Counter party wallets</h5> }
        { this.props.isPartyB || <CounterPartyWallets /> }
        { this.props.isPartyB
          ? <ExpirationDetails />
          : <InitiatorExpirationInfo /> }
        {!errors.initiation && !this.props.isPartyB && <Button wide primary loadingMessage={this.props.loadingMessage} onClick={this.props.initiateSwap}>Initiate Swap</Button>}
        {!errors.initiation && this.props.isPartyB && <Button wide primary loadingMessage={this.props.loadingMessage} onClick={this.props.confirmSwap}>Confirm Terms</Button>}
        {errors.initiation && <Button primary disabled>{ errors.initiation }</Button>}<br />
        {/* TODO: Do actual resetting of app state instead of refresh. */}
        <Button wide link onClick={() => window.location.replace(APP_BASE_URL)}>{ this.props.isPartyB ? 'Abandon Swap' : 'Cancel' }</Button>
      </div>
    </div>
  }
}

export default SwapInitiation
