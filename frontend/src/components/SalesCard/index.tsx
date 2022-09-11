import axios from 'axios';
import { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Sale } from '../../models/sale';
import { BASE_URL } from '../../utils/request';

import NotificationButton from '../NotificationButton';
import './styles.css';

function SalesCard() {
  // declarando o dado e a função que muda a variável
  const initialMinDate = new Date(new Date().setDate(new Date().getDate() - 365));
  const initialMaxDate = new Date();

  const [minDate, setMinDate] = useState(initialMinDate);
  const [maxDate, setMaxDate] = useState(initialMaxDate);

  const [sales, setSales] = useState<Sale[]>([]);

  useEffect(() => {
    const dmin = minDate.toISOString().slice(0, 10);
    const dmax = maxDate.toISOString().slice(0, 10);
    console.log(dmin);
    console.log(dmax);
    console.log('TESTE DO USEEFFECT')
    axios.get(`${BASE_URL}/sales?minDate=${dmin}&maxDate=${dmax}`).then(response => {
      //console.log(response.data);
      setSales(response.data.content);

    })
  }, [minDate, maxDate])

  // a lista de dependência [minDate,maxDate] indica para o react que toda vez que estas variáveis forem modificadas ele deverá executar a função do callback

  return (
    <div className="dsmeta-card">
      <h2 className="dsmeta-sales-title">Vendas</h2>
      <div>
        <div className="dsmeta-form-control-container">
          <DatePicker
            selected={minDate}
            onChange={(date: Date) => setMinDate(date)}
            className="dsmeta-form-control"
            dateFormat="dd/MM/yyyy"
          />
        </div>
        <div className="dsmeta-form-control-container">
          <DatePicker
            selected={maxDate}
            onChange={(date: Date) => setMaxDate(date)}
            className="dsmeta-form-control"
            dateFormat="dd/MM/yyyy"
          />
        </div>
      </div>

      <div>
        <table className="dsmeta-sales-table">
          <thead>
            <tr>
              <th className="show992">ID</th>
              <th className="show576">Data</th>
              <th>Vendedor</th>
              <th className="show992">Visitas</th>
              <th className="show992">Vendas</th>
              <th>Total</th>
              <th>Notificar</th>
            </tr>
          </thead>
          <tbody>

            {
              sales.map(element => {
                // map repete a função para cada elemento da lista
                return (
                  <tr key={element.id}>
                    {/* o atributo key é necessário para renderizar uma lista no react */}
                    <td className="show992">{element.id}</td>
                    <td className="show576">{new Date(element.date).toLocaleDateString()}</td>
                    <td>{element.sellerName}</td>
                    <td className="show992">{element.visited}</td>
                    <td className="show992">{element.deals}</td>
                    <td>{element.amount.toFixed(2)}</td>
                    <td>
                      <div className="dsmeta-red-btn-container">
                        <NotificationButton />
                      </div>
                    </td>
                  </tr>
                )
              })}

          </tbody>
        </table>
      </div>
    </div >
  )
}

export default SalesCard;
