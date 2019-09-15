/*************MODEL */

let model = {
  currentCat: null,
  cats: [
    {
      name: "Gloria",
      imgSrc: "img/img1.jpg",
      clicks: 0
    },
    {
      name: "Giulio",
      imgSrc: "img/img2.jpg",
      clicks: 0
    },
    {
      name: "Gioia",
      imgSrc: "img/img3.jpg",
      clicks: 0
    },
    {
      name: "Giannone",
      imgSrc: "img/img4.jpg",
      clicks: 0
    },
    {
      name: "Giordano",
      imgSrc: "img/img5.jpg",
      clicks: 0
    }
  ]
};

/*************OCTOPUS */

let octopus = {
  init: function() {
    model.currentCat = model.cats[0];

    listCatView.init();
    catView.init();
  },

  getCurrentCat: function() {
    return model.currentCat;
  },

  getCats: function() {
    return model.cats;
  },

  setCurrentCat: function(cat) {
    model.currentCat = cat;
  },

  setCounterCat: function() {
    model.currentCat.clicks++;
    catView.render();
  },

  updateCats: function(name, img, click) {
    model.currentCat.name = name;
    model.currentCat.imgSrc = img;
    model.currentCat.clicks = click;
  }
};

/*************VIEW */

let catView = {
  init: function() {
    this.containerElement = document.querySelector("#cat-box");
    this.catName = document.querySelector("#name");
    this.catImg = document.querySelector("#img");
    this.catClick = document.querySelector(".counter");
    this.adminBtn = document.querySelector(".admin-btn");
    this.formName = document.querySelector("#nameF");
    this.formImg = document.querySelector("#imgF");
    this.formClick = document.querySelector("#clicksy");
    this.saveBtn = document.querySelector("#save");
    this.exitBtn = document.querySelector("#exit");
    let formBox = document.querySelector(".formBox");

    this.exitBtn.addEventListener("click", function(event) {
      event.preventDefault();
      formBox.classList.toggle("hide");
    });

    this.saveBtn.addEventListener("click", function(event) {
      event.preventDefault();

      let nameNew = document.querySelector("#nameF").value;
      let imgNew = document.querySelector("#imgF").value;
      let clickNew = document.querySelector("#clicksy").value;
      octopus.updateCats(nameNew, imgNew, clickNew);

      catView.render();
    });

    this.adminBtn.addEventListener("click", function() {
      formBox.classList.toggle("hide");
    });
    this.catImg.addEventListener("click", function() {
      octopus.setCounterCat();
    });

    this.render();
  },

  render: function() {
    let currentCat = octopus.getCurrentCat();
    this.catName.textContent = currentCat.name;
    this.catImg.src = currentCat.imgSrc;
    this.catClick.textContent = currentCat.clicks;
    this.formName.value = currentCat.name;
    this.formImg.value = currentCat.imgSrc;
    this.formClick.value = currentCat.clicks;
  }
};

let listCatView = {
  init: function() {
    this.listCats = document.querySelector("#cats");
    this.render();
  },

  render: function() {
    let elem, cat, i;

    let cats = octopus.getCats();

    this.listCats.innerHTML = "";

    for (i = 0; i < cats.length; i++) {
      cat = cats[i];
      elem = document.createElement("li");
      elem.textContent = cat.name;

      elem.addEventListener(
        "click",
        (function(copyCat) {
          return function() {
            octopus.setCurrentCat(copyCat);
            catView.render();
          };
        })(cat)
      );

      this.listCats.appendChild(elem);
    }
  }
};

octopus.init();
