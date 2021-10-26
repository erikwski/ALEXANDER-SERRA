let logo_alex = `
    <!--<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="120" height="60" viewBox="0 0 120 60">
        <image x="4" width="43" height="60" xlink:href="data:img/png;base64,iVBORw0KGgoAAAANSUhEUgAAACsAAAA8CAYAAAD/jkPjAAAESklEQVRogc2Za4hVVRTHfzOOoiPjAxXTTDFUElIrKUdkbAgfhOQjK4xM0IRUGsv6lsgMGpEWU+GHUUY0KFELUSs0KNAGNTVHQTQNrDQ/ZBqV4nN0vLJgXdhuz2ufs++d+cNhuHf2Wet319l7rbX3ocB6GtgA/ArcAnLAWeCVQjt2UQdgJtCqgPa1sz1AdgTWAP+EQOav28DgtoZ9PQbSvOa6Gi/1DPuAw9gbnn07ayBwPmFkf3A17juy/wNlCce2uBr3DSspqlfCsXs9+3bWlgSP/zrQDPRva9hy4D3gYgRsPdDFwabk7J6FgB0N7EsQ3ZMJIlsCfKQ5+zIw1CfoBOCaQ56NywaTrSLiBbYK+NkB0rzGhdjsBhwzxl3QtJhanXT+3UkJKte/wLMWgDz+bfr/P4EFjnP8PvUFmgKcC/hvjsDyiJ8zQFcY3w/JAil6RH+x7VTy5qP6f9cIyyJ6BthtfPdFVlDRSsOgVKFvgCnWmEMZpkZOe9/hPmDrDKO/hIx5LSNsnQ9Q0TzD6JmQMeXaJ8RB1QZMqV1aCLxolGH4WoTBTxLAVmtK+kM/Hwd6+AJFV+zvhsPeIeOSLLQndKykwUrNr971luFwVoTx72NgvZbQMMle64Q63BoxbmYMbNJ2MrMWqMPzEYaejABtLRZomS6GKKddgc0RsH8XC3aSlcDtHcfDViMSdP3k6jTpfsnWQ8bnw9oT5CWVpykiS+TVnNK3s6ZrpARyvHGzRPhowio1o1iwErW/gJvW91UOJbUma+vnohp1ah5s1DnA5vQHz086HbNsxc/qX3P+uu5Y5Yc26tSpysASq8c0Os8bA5szdlsNmvK8q6c6eFMNZ20L89dxTX3edVm3yyN1sfmAzekU62vDZj0+Oq2961rtnHxJ2sZNPvtaUWfgpQSR2uaQf83rQ5+w0tueinG4V6MuT/EFPaK/5QBc4wt2Soyjg0D3gPukyZ4GfAD8qAfLYTZaguZvGu1JARqkCmARcC7E1qCsoK9GgO5wADU1J8DW5iyQUqXWhxwbXdcIlaS0bZ/vtqSNqqz85cCVkGheNDaAaVQekKsb0hjqBxyJeOwCOiIDqGhsgF1nmxURXb+s4nWeXsAtDFigzvoqAFION94G+niAzKvR8uH8Um9JAOhp7QV8yz487uxiv1rPSE3Q/Z6jmVcXy1ety80P6lbZBN2uK7YQqjT8XHI575I6fsACXeW7A7K0OE3zUqIJ31xILxcQMq+d6k8anAFxg2UvNBHYaID+BzxeBNBhRjX8Lm7wspCyOaYIoFhPMrYd/DoA9o3icPKu1dtOjbuh3gJtytCIuGhxQJC+jLq/VDd9pt7XGwutpwLsvxjXD3xs/LJjRYoq2v1/rnnVjO47UTd9lqUee1CF8fozp3u60FKbP7O6WqjTkASSgrPaWjeBTXc/rcv72wjU1GzgWy1Gn4YNWqoltr1IXrDcW96Bu1+AnW4QigFAAAAAAElFTkSuQmCC"/>
        <image x="51" width="66" height="60" xlink:href="data:img/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEIAAAA8CAYAAADSfGxZAAAFB0lEQVRogeWbeYhVVRzHPzO9yjErHaXVqEyihRbb1AoLIqgwCoIoI+kfaYGKiKioCKlAbbGptMwiwxaDIAqpoMaipExpkxCTFqOJmTIjbaxmKl/84Hvh+rz7Pee9OzNfOAzcc985v9/3nvNbzvkNnjAO+A4409cErrGHhzFnAHXgU+A1PesHftHzRuwPdAD7AG3APy1hwgPuBLYAm4HtUt7az0AX8BSwEvgS2BHqD9pOvbsImDBUSZgNrAY+jFEyb7OV9BAw0bfgrrfG9xL+AOAoYFTJ8faSnbkZOBnoBX5IeP8Q4BTgcGBQssTBZJsCnAVsaCspaCNMgNeBP4CvtbQv0TtfAU8AP2rL9EvR4ySQ/d1T7x4rMqPwKrAAWBfqOwF4UkqFcb+2WF/EOFcBTwP/AQc75mE33CohZsoQZsVEEZe0ld4FjlDbkvDeX8BpEfMuUv+/wL2+iVgq5otgLPBOChnmol/OYHeMjPOAi4E3genaYta3Fdjomwj7svuW+L3ZsMcdGN26tqzh9oi++e2OFI5Dj+xFUdj+He1IlsDzPBhhcNc6msMb7nCwErbLHswJCdkV6v9VwVxlcZujLbE4Yuzlof7ZLdAtM2Y5IqGuED6MsXLddQV+lYVZ9L8dkbA5QskFof5rq0rCkaHkrEwbVM7TCAvUBjTuTkWilYOFvBscrYQ+ba+wVxwPbAq9814VSTDMd2gXgrZWq2y0ksFw36UV0Hk3XFZC2YGUELtfyWD42ec5Q/6m4ELF+0VI+EnG1b74S8CfGX93TtVIuBz4vQABvUqUGsP3A4GFKWMubZGukbBleaNC6DwEbAOuV/qeBDO8VwArQjFDXcnVmKqQcDqwpsAq2CT3lxcdMoz36bCo5agBj8h/5yFgh3KOtFUwZLCswCr4WO5v2OCCAiSs0/3IsMLKgu7RTpaeAw4bDmTUcvj3JDsxD+isgD6FcWpJEsLN4oN7HJ5aNRV3OSQiaHbUdtFQImG69rlrIoL2BnBMBfRMxFRFgr5ICJrlKY+WjTN83IajCHCVjsXSYJfC3cDeunHKmxXamcM03aB9VlTgWtEfJsAUeiVDDGCny1fqwiXAeGWGFoYfDUwCJmfMDzo86FIKD2RYzj0584aDgKsTkjQj9dAqkXCiCj3SSJicc9wxKjyJG3OWJ30KoT1DVrlRl7Z5kXS/eXeVSDDMTSFhVcHIcGbCmAs96FEYVtPwWAoJy0K1D3nQpvPFqDGfrcq5Y5sOPL5IIWFuCYHnxIy5wqPrz4WzgY9SCOjVwWxRTFDtQuO4L3py+7mwn75GmntconfLYHnEuIursB1GZVgF5udvcDDX+RFjz3MwbmnYV3ghhYQ12jJlMSni/rOrCiSgpCaOgPUOU+L2iKu51VWwCahEL4qAQVXNuSo/Gqfl3zjP8Y7GL4W40p1vgTMcz/VWxDyVuLG+KSE4ypJe50GUcbT2gV8Vd4UdaEwJPakpdG0UqkfH8q7RmRA92qHtSc0i4hpN2q0ahSihuj1Wys+IISFofSox9o60ZGlJE8LZqaqxHkiQw4z2uT49SJJrfLvJMb2dUF0HfJIgk7eY4pmYCd9v8RX6NIXz4cuhbT7rIqMuZ9dH1Ce2Ep3yVN5WZy0mOXpY7FcFvzVDDvu/h0bjOCJh/2kTkPBNlUprmo2wy7plZKm+KwIStjo4TBmyaFetouF5XZSMWFhkaSl102L6ygH4H4Gdb7fC1CCBAAAAAElFTkSuQmCC"/>
    </svg>-->
    <img src="img/logo.png" class=""></img>
`;
var el_loghi_alex = document.querySelectorAll(".alex_logo, .fake_alex_logo");

el_loghi_alex.forEach((el) => {
  el.innerHTML = logo_alex;
});
let html = document.documentElement;
let page_height = html.clientHeight;
document.addEventListener("scroll", function (e) {
  var aboutme_top =
      document.getElementById("about_me").getBoundingClientRect().top +
      document.getElementById("about_me").getBoundingClientRect().height / 2,
    service_top =
      document.getElementById("servizi").getBoundingClientRect().top +
      document.getElementById("servizi").getBoundingClientRect().height / 2,
    review_top =
      document.getElementById("review").getBoundingClientRect().top +
      document.getElementById("review").getBoundingClientRect().height / 2,
    contattami_top =
      document.getElementById("contattami").getBoundingClientRect().top +
      document.getElementById("contattami").getBoundingClientRect().height / 2;
  console.log(aboutme_top, service_top, review_top, contattami_top);
  //CALCOLO IN QUALE DIV SIAMO
  let active_el = document.getElementsByClassName("menu_active") || [];
  let new_active = null;
  if (active_el.length) active_el[0].classList.remove("menu_active");
  if (aboutme_top > page_height) {
    new_active = document.querySelectorAll("[href='#home']");
  } else if (service_top > page_height) {
    new_active = document.querySelectorAll("[href='#about_me']");
  } else if (review_top > page_height) {
    new_active = document.querySelectorAll("[href='#servizi']");
  } else if (contattami_top > page_height) {
    new_active = document.querySelectorAll("[href='#review']");
  } else {
    new_active = document.querySelectorAll("[href='#contattami']");
  }
  if (new_active) new_active[0].classList.add("menu_active");
});
