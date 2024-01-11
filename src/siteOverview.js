import React from 'react';
import { Tooltip } from 'antd';
import { Link } from 'react-router-dom';
import { CheckOutlined, MinusOutlined, InfoCircleOutlined } from '@ant-design/icons';
//(() => {
  // src/siteOverview.js
  const makeSiteSummaryData = function (data) {
      const siteSummaryData = data.site_grid_details
          .filter(d => d.subject_enrolled > 0)
          .map((item) => {
            const obj = {
                site_data: {
                site_id: item.site_id,
                ...item.site_id_details,
                site_investigator: item.site_investigator
                },
                enrolled_subjects: item.subject_enrolled,
                red_kris: item.flagged_kri,
                amber_kris: item.at_risk_kri
            };

            const kriObj = item.kri_column_details.sort((a, b) => Object.keys(a) < Object.keys(b) ? -1 : Object.keys(b) < Object.keys(a) ? 1 : 0).reduce((kriItems, kriItem) => {
                kriItems[Object.keys(kriItem)] = { ...kriItem[Object.keys(kriItem)], site_id: item.site_id };
                return kriItems;
            }, {});

            return { ...obj, ...kriObj };
          });
    return siteSummaryData;
  };

const defineColumns = function(kriObj) {
     const columns = [
       {
         header: "Site ID - test",
         accessorKey: "site_data",
         cell: function(props) {
           return /* @__PURE__ */ React.createElement(Tooltip, { 
             placement: "right",
             color: "#fff",
             title: /* @__PURE__ */ React.createElement("div", { 
               className: "align darkTxt"
             }, props.getValue().site_id ? /* @__PURE__ */ React.createElement("p", null, /* @__PURE__ */ React.createElement("b", null, "Site ID:"), " ", props.getValue().site_id) : "", /* @__PURE__ */ React.createElement("hr", null), props.getValue().site_name ? /* @__PURE__ */ React.createElement("p", null, "Site name: ", /* @__PURE__ */ React.createElement("b", null, props.getValue().site_name)) : "", props.getValue().city ? /* @__PURE__ */ 
 React.createElement("p", null, "City: ", /* @__PURE__ */ React.createElement("b", null, props.getValue().city)) : "", props.getValue().state ? /* @__PURE__ */ React.createElement("p", null, "State: ", /* @__PURE__ */ React.createElement("b", null, props.getValue().state)) : "", props.getValue().country ? /* @__PURE__ */ React.createElement("p", null, "Country: ", /* @__PURE__ */ React.createElement("b", null, props.getValue().country)) : "", props.getValue().site_status ? /* @__PURE__ */ React.createElement("p", null, "Status: ", /* @__PURE__ */ React.createElement("b", null, props.getValue().site_status)) : "")
           }, /* @__PURE__ */ React.createElement("div", {       
             style: { display: "grid" }
           }, /* @__PURE__ */ React.createElement("span", {      
             className: "help"
           }, /* @__PURE__ */ React.createElement(Link, {        
             to: `${props.getValue().site_id}`,
             style: { cursor: "pointer", color: "black", fontWeight: "bold", textDecoration: "underline" }
           }, props.getValue().site_id, /* @__PURE__ */ React.createElement(InfoCircleOutlined, {
             style: { color: "#3c587f", cursor: "help", fontSize: "12px", marginLeft: "2px" }
           }))), /* @__PURE__ */ React.createElement("span", null, `${props.getValue().site_investigator}`.split(",").shift())));        }
       },
       {
         header: "Enrolled subjects",
         accessorKey: "enrolled_subjects"
       },
       {
         header: "Red KRIs",
         accessorKey: "red_kris"
       },
       {
         header: "Amber KRIs",
         accessorKey: "amber_kris"
       },
       ...kriObj
     ];
     return columns;
   };

  const siteOverview = {
    makeSiteSummaryData,
    defineColumns
  };
//var siteOverview_default = siteOverview;
//  return siteOverview;
//
export default siteOverview;
