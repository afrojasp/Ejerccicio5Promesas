
const urlProductos = 'https://gist.githubusercontent.com/josejbocanegra/be0461060d1c2d899740b8247089ba22/raw/916d2141e32e04031bda79c8886e8e4df0ae7f24/productos.json';
const urlPedidos = 'https://gist.githubusercontent.com/josejbocanegra/7b6febf87e9d986048a648487b35e693/raw/576531a2d0e601838fc3de997e021816a4b730f8/detallePedido.json';

let jsonProductos;
let jsonPedidos;
let productoMasVendido;


fetch(urlProductos)
    .then(response => {
        return response.json();
    })
    .then(myJson => {
        fetch(urlPedidos)
            .then(response => {
                return response.json();
            })
            .then(myJson2 => {
                jsonProductos = myJson;
                jsonPedidos = myJson2;

                jsonPedidos.sort(function(a,b) {
                    var x = a['idproducto'],
                    y = b['idproducto'];
                    return ((x > y) ? -1 : ((x < y) ? 1 : 0));
                })

                let idProductoPedidoAnterior = 0;
                let idProductoMasVendido = 0
                let cantidadMasVendido = 0
                let cantidadVendidoParcial = 0;

                jsonPedidos.forEach((element, index) => {
                    if(idProductoPedidoAnterior === 0){
                        idProductoPedidoAnterior = element.idproducto;
                        cantidadVendidoParcial = parseInt(element.cantidad, 10);
                    }

                    else if(idProductoPedidoAnterior == element.idproducto){
                        cantidadVendidoParcial += parseInt(element.cantidad, 10)
                        if(index === jsonPedidos.lenght){
                            if(cantidadVendidoParcial > cantidadMasVendido){
                                cantidadMasVendido = cantidadVendidoParcial;
                                idProductoMasVendido = idProductoPedidoAnterior;
                            }
                        }
                    }
                    else{
                        if(cantidadVendidoParcial > cantidadMasVendido){
                            cantidadMasVendido = cantidadVendidoParcial;
                            idProductoMasVendido = idProductoPedidoAnterior;
                        }
                        cantidadVendidoParcial = parseInt(element.cantidad, 10) 
                        idProductoPedidoAnterior = element.idproducto;
                    }
                });

                let productoRespuesta = new Object();

                jsonProductos.forEach(element => {
                    if (element.idproducto == idProductoMasVendido){
                        productoRespuesta.nombreProducto = element.nombreProducto;
                        productoRespuesta.cantidadVendida = cantidadMasVendido;
                    }
                })
            
                console.log(productoRespuesta);
            })
    });

    
