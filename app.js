class Product {
  constructor(name, price, year) {
      this.name = name;
      this.price = price;
      this.year = year;
  }
}

class UI {
  addProduct(product) {
      const productList = document.getElementById('product-list');
      const element = document.createElement('div');
      element.innerHTML = `
          <div class="card text-center mb-4">
              <div class="card-body">
                <span style="color:red">Product Name</span>: ${product.name}
                <span style="color:red">Product Price</span>: ${product.price}
                <span style="color:red">Product Year</span>: ${product.year}
                <a href="#" class="btn btn-outline-danger ml-2" name="delete">Delete</a>
              </div>
          </div>
      `;
      productList.appendChild(element);
  }

  resetForm() {
    document.getElementById('product-form').reset();
  }

  deleteProduct(element) {
      if(element.name === 'delete') {
          element.parentElement.parentElement.parentElement.remove();
          this.showMessage('Product Deleted Succesfully', 'danger');
      }
  }

  showMessage(message, cssClass) {
    const div = document.createElement('div');
    div.className = `alert alert-${cssClass} mt-2`;
    div.appendChild(document.createTextNode(message));
    // Showing in DOM
    const container = document.querySelector('.container');
    const app = document.querySelector('#App');
    container.insertBefore(div, app);
    setTimeout(function () {
        document.querySelector('.alert').remove(); // All class that start with alert will be remove
    }, 3000);
  }
}

//DOM Events
document.getElementById('product-form')
    .addEventListener('submit', function(e) {
      const name = document.getElementById('name').value;
      const price = document.getElementById('price').value;
      const year = document.getElementById('year').value;

      const product = new Product(name, price, year);

      const ui = new UI();

      if(name === '' || price === '' || year === '') {
        return ui.showMessage('Complete Fields Please', 'danger');
      }

      ui.addProduct(product);
      ui.resetForm();
      ui.showMessage('Product Added Succesfully', 'success');

      e.preventDefault();
    });

document.getElementById('product-list').addEventListener('click', function (e) {
        const ui = new UI();
        ui.deleteProduct(e.target);
    });
