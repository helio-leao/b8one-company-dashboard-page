const Charts = {
    sales: {
        labels: [
            '06/10/21',
            '07/10/21',
            '08/10/21',
            '09/10/21',
            '10/10/21',
            '11/10/21',
            '12/10/21',
        ],

        datasets: [
            {
                label: 'Estornado',
                backgroundColor: 'rgb(66, 93, 199)',
                borderColor: 'rgb(66, 93, 199)',
                data: [0, 25, 10, 10, 10, 50, 10],
                pointRadius: 0,
            },
            {
                label: 'Cancelado',
                backgroundColor: 'rgb(240, 52, 96)',
                borderColor: 'rgb(240, 52, 96)',
                data: [0, 14, 0, 0, 40, 0, 50],
                pointRadius: 0,
            },
            {
                label: 'Não Pago',
                backgroundColor: 'rgb(255, 190, 0)',
                borderColor: 'rgb(255, 190, 0)',
                data: [0, 0, 25, 40, 55, 40, 100],
                pointRadius: 0,
            },
            {
                label: 'Pago',
                backgroundColor: 'rgb(21, 143, 46)',
                borderColor: 'rgb(21, 143, 46)',
                data: [0, 75, 75, 150, 50, 180, 180],
                pointRadius: 0,
            },
        ]
    },

    orders: {
        labels: [
            '06/10/21',
            '07/10/21',
            '08/10/21',
            '09/10/21',
            '10/10/21',
            '11/10/21',
            '12/10/21',
        ],

        datasets: [
            {
                label: 'Total de pedidos',
                backgroundColor: 'rgb(66, 93, 199)',
                borderColor: 'rgb(66, 93, 199)',
                data: [0, 70, 70, 120, 40, 180, 180],
                pointRadius: 0,
            },
        ]
    },

    resellers: {
        labels: [
            '06/10/21',
            '07/10/21',
            '08/10/21',
            '09/10/21',
            '10/10/21',
            '11/10/21',
            '12/10/21',
        ],

        datasets: [
            {
                label: 'Valor total de vendas',
                backgroundColor: 'rgb(66, 93, 199)',
                borderColor: 'rgb(66, 93, 199)',
                data: [0, 25, 10, 10, 10, 50, 10],
                pointRadius: 0,
            },
            {
                label: 'Quantidade de pedidos',
                backgroundColor: 'rgb(21, 143, 46)',
                borderColor: 'rgb(21, 143, 46)',
                data: [0, 14, 0, 0, 40, 0, 50],
                pointRadius: 0,
            },
            {
                label: 'Comissão a pagar',
                backgroundColor: 'rgb(240, 52, 96)',
                borderColor: 'rgb(240, 52, 96)',
                data: [0, 0, 25, 40, 55, 40, 100],
                pointRadius: 0,
            },
        ]
    }

}