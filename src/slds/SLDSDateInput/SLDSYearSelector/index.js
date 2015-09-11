/*
Copyright (c) 2015, salesforce.com, inc. All rights reserved.
Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
Neither the name of salesforce.com, inc. nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.
THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

import React, { Component } from 'react';
import SLDSPopover from '../../SLDSPopover';
import Moment from 'moment';
import {InputIcon} from "./../../SLDSIcons";

var ListItemComponent = React.createClass( {

  getDefaultProps: function(){
    return {
      moment: Moment(),
      onSelect: function(moment){
        console.log('onSelect should be defined');
      }
    }
  },

  handleClick() {
    if(this.props.onSelect && this.props.value){
      this.props.onSelect(this.props.moment.set('year', this.props.value));
    }
  },

  render() {
    return (
      <li className={this.props.isSelected?'slds-is-selected':''} aria-selected={this.props.isSelected} onClick={this.handleClick}>
        { this.props.value }
      </li>
    )
  }
});

module.exports = React.createClass( {

  displayName: "SLDSYearSelector",

  getDefaultProps (){
    return {
      moment:Moment(),
      relativeFrom:-3,
      relativeTo:15,
      onChange (moment){
        console.log('onChange should be defined');
      }
    }
  },

  componentWillReceiveProps(nextProps){
    this.setState({isOpen:false});
  },

  handleSelectDate(day) {
    this.setState({selectedDate:day})
  },

  handleClose() {
    this.setState({isOpen:false})
  },

  handleClick() {
    this.setState({isOpen:true})
  },

  handleFocus() {
    this.setState({isOpen:true})
  },

  handleBlur() {
    this.setState({isOpen:false})
  },

  handleSelect(moment) {
    if(this.props.onSelect){
      this.props.onSelect(moment);
    }
    this.setState({isOpen:false});
  },

  listItems() {
    let listItems = [];
    let currentYear = this.props.moment.year();
    let from = Moment().add(this.props.relativeFrom,'y').year();
    let to = Moment().add(this.props.relativeTo,'y').year();

    for(let i=from;i<to;i++){
      listItems.push(<ListItemComponent 
          key={'year_'+i}
          onSelect={this.handleSelect} 
          isSelected={currentYear===i}
          moment={this.props.moment}
          value={i} />);
    }
    return listItems;
  },

  popover() {
    if(this.state && this.state.isOpen){
      return (
        <SLDSPopover targetElement={this.refs.date}>
          <div className="ignore-react-onclickoutside">
          <ul className="slds-datepicker--time__list" tabIndex="0">
            { this.listItems() }
          </ul>
          </div>
        </SLDSPopover>
      );
    }
    return <span />;
  },

  render() {
    return (
      <div className="slds-form-element">
        <div className="slds-form-element__control">
          <div className="slds-input-has-icon slds-input-has-icon--right">
            <button id="year" 
              className="slds-button slds-button--neutral slds-picklist__label" 
              onClick={this.handleClick}
              onFocus={this.handleFocus}
              onBlur={this.handleBlur}
              aria-haspopup="true" 
              aria-expanded="false">{this.props.moment.format('YYYY')}
              <span style={{color:'black'}}></span>
            </button>
            <InputIcon name="down"/>
          </div>
        </div>
        {this.popover()}
      </div>
    );
  }
});