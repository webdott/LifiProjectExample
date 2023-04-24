import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import styles from './faq.module.scss';

function FAQS(): JSX.Element {
  return (
    <div>
      <Accordion className={styles.faq}>
        <AccordionSummary
          className={styles.faqTitle}
          expandIcon={<ExpandMoreIcon />}
          aria-controls='panel1a-content'
          id='panel1a-header'
        >
          <p>
            How To Bet on gamblr With Crypto <br />
          </p>
          <br />
          <p>Install & Connect MetaMask Connect To MetaMask Using Mobile</p>
        </AccordionSummary>
        <AccordionDetails className={styles.faqContent}>
          <p>
            On your mobile device, engage the MetaMask mobile application;
            <br />
            Locate and engage the Settings menu button; <br />
            Choose Browser from the listed options; <br />
            Search for gamblr.xyz in the search bar; <br />
            Select Connect Wallet, then MetaMask; <br />
            Select Approve after connecting to gamblr.xyz , by the way, if for the first time, will
            automatically request your consent to add the Gnosis Chain RPC to your wallet;
            <br />
            Connection to gamblr.xyz and Gnosis Chain is now successful;
            <br />
            Connect To MetaMask Using Desktop <br /> Make sure you have attained legal betting age,
            then proceed to visit the gamblr.xyz website;
            <br />
            Hit the Connect wallet menu button, followed by the MetaMask option;
            <br />
            This automatically adds and switches to the Gnosis network if no connection has ever
            been established; <br />
            Study carefully and sign the Terms and Conditions, to be bound by it; <br />
            Get xDAI on Gnosis Chain <br />
            gamblr.xyz is supported by an Azuro Protocol front-end operator. In turn, the Azuro
            Protocol runs on the Gnosis Chain, whose traditional tender is the xDAI crypto.
            <br /> The Azuro liquidity pools are made up of xDAI, and all placed bets and redeemed
            bets will be in xDAI. Here are a few ways bettors can obtain xDAI:
          </p>
          <br />

          <p>
            Buy xDAI By Fiat Or On A DEX <br />
            Bettors can purchase xDAI via the following mediums:
          </p>
          <br />
          <p>
            MtPelerin; <br />
            Ramp.Network; <br />
            AscendEx; <br />
            Transfer Of Assets From Other Networks <br />
            Using Uniswap, Quickswap, Cowswap, swap tokens available into DAI via DEX; <br />
            Using Connext, xDAI Bridge, and Hop Protocol, bettors can bridge DAI to Gnosis Chain{' '}
            <br />
            Choose An Event & Make a Bet <br />
            Picking online sports betting events, and placing bets on them is an intrinsic part of
            this procedure, follow the little-by-little tips to learn more:
          </p>
          <br />
          <p>
            Choose your preferred betting event; <br />
            Choose your desired market outcome, for example total goals, full-time result, double
            chance, etc; <br /> Select the possible outcome of the match; <br />
            Indicate the quantity on the bet slip; <br />
            Complete the process by hitting the Place Bet menu button; <br />
            Redeem Winnings From Played Bet <br />
            Since gamblr.xyz is on-chain, bettors are mandated to redeem their winnings after the
            events are played.Follow the instructions below for more on redeeming winnings:
            <br />
          </p>
          <br />
          <p>
            On the homepage, hit the Profile icon; <br />
            On the drop-down, hit the "My Bets" menu button; <br />
            Locate the successful bets from the "Unredeemed Bets", and engage the "Redeem" menu
            option; <br />
            You will be required to confirm the transaction, to redeem your winnings, when MetaMask
            opens.
          </p>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}

export default FAQS;
