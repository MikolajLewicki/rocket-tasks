import React, {useState, useEffect} from 'react'
import styles from './Stats.module.scss'
import statsStore from '../../zustand/statsStore'
import { motion } from 'framer-motion'
import Chart from 'react-apexcharts'
const Stats = () => {
    const content = statsStore(state => state.content)
    const [chartsData, setChartsData] = useState({
        PieChart1: {
            options: {
                labels: ['Apple', 'Mango', 'Orange', 'Carrot', 'Melon', 'Strawberry'],
                dataLabels: {
                    formatter: (val, opts) => opts.w.config.series[opts.seriesIndex]
                },
                colors: ['#C1BDDB', '#D7C4F2', '#DABCE8', '#C4CAF2', '#BCCDE8'],
            },
            series: [44, 55, 42, 12, 16, 89],
          },
        PieChart2: {
            options: {
                labels: ['Apple', 'Mango', 'Orange', 'Carrot', 'Melon', 'Strawberry'],
                dataLabels: {
                    formatter: (val, opts) => opts.w.config.series[opts.seriesIndex]
                },
                colors: ['#C1BDDB', '#D7C4F2', '#DABCE8', '#C4CAF2', '#BCCDE8'],
            },
            series: [44, 55, 42, 12, 16, 89],
          },
        BarChart1: {
            series: [{
              name: 'Website Blog',
              type: 'column',
              data: [44, 50, 41, 67, 22, 13, 21, 35, 52, 32, 57, 10]
            }, {
              name: 'Social Media',
              type: 'line',
              data: [23, 42, 35, 27, 43, 22, 17, 31, 22, 22, 12, 16]
            }],
            options: {
            colors: ['#C1BDDB', '#BCCDE8', '#DABCE8', '#C4CAF2', '#D7C4F2'],
              stroke: {
                width: [0, 4]
              },
              dataLabels: {
                enabled: true,
              },
              labels: ['01 Jan 2001', '02 Jan 2001', '03 Jan 2001', '04 Jan 2001', '05 Jan 2001', '06 Jan 2001', '07 Jan 2001', '08 Jan 2001', '09 Jan 2001', '10 Jan 2001', '11 Jan 2001', '12 Jan 2001'],
              xaxis: {
                type: 'datetime'
              }
            },
        },
        BarChart2: {
            series: [{
              name: 'Website Blog',
              type: 'column',
              data: [44, 50, 41, 67, 22, 13, 21, 35, 52, 32, 57, 10]
            }, {
              name: 'Social Media',
              type: 'line',
              data: [23, 42, 35, 27, 43, 22, 17, 31, 22, 22, 12, 16]
            }],
            options: {
            colors: ['#C1BDDB', '#BCCDE8', '#DABCE8', '#C4CAF2', '#D7C4F2'],
              stroke: {
                width: [0, 4]
              },
              dataLabels: {
                enabled: true,
              },
              labels: ['01 Jan 2001', '02 Jan 2001', '03 Jan 2001', '04 Jan 2001', '05 Jan 2001', '06 Jan 2001', '07 Jan 2001', '08 Jan 2001', '09 Jan 2001', '10 Jan 2001', '11 Jan 2001', '12 Jan 2001'],
              xaxis: {
                type: 'datetime'
              }
            },
        },
        BarChart3: {
            series: [{
              name: 'Website Blog',
              type: 'column',
              data: [44, 50, 41, 67, 22, 13, 21, 35, 52, 32, 57, 10]
            }, {
              name: 'Social Media',
              type: 'line',
              data: [23, 42, 35, 27, 43, 22, 17, 31, 22, 22, 12, 16]
            }],
            options: {
            colors: ['#C1BDDB', '#BCCDE8', '#DABCE8', '#C4CAF2', '#D7C4F2'],
              stroke: {
                width: [0, 4]
              },
              dataLabels: {
                enabled: true,
              },
              labels: ['01 Jan 2001', '02 Jan 2001', '03 Jan 2001', '04 Jan 2001', '05 Jan 2001', '06 Jan 2001', '07 Jan 2001', '08 Jan 2001', '09 Jan 2001', '10 Jan 2001', '11 Jan 2001', '12 Jan 2001'],
              xaxis: {
                type: 'datetime'
              }
            },
        },
    })
    return(
        <>{content.length !== 0 ? 
            <motion.div initial={{opacity: 0, scale: 0.75}} animate={{opacity: 1, scale: 1, transition: {delay: 0.1}}}  className={styles.noMatchingResults}>
                <h2>Porównaj swoje wyniki!</h2>
                <p>Dostosuj filtry aby wyświetlić odpowiednie Statystyki</p>
            </motion.div> : <> {content === "no tasks" ? 
                <motion.div initial={{opacity: 0, scale: 0.75}} animate={{opacity: 1, scale: 1, transition: {delay: 0.3}}}  className={styles.noMatchingResults}>
                    <h1>Ooops!</h1>
                    <h2>Brak pasujących zadań</h2>
                    <p>Dostosuj filtry aby znaleźć inne wyniki</p></motion.div> : 
                <div className={styles.wrapper}>
                    <div className={styles.title}> Statystyki z okresu </div>
                    <div className={styles.sectionTitle}>Podział Zadań</div>
                    <div className={styles.chartContainer}>
                        <div style={{width: '50%'}}>
                        <Chart options={chartsData.PieChart1.options} series={chartsData.PieChart1.series} type="pie" width="100%" height={320} />
                        </div>
                        <div style={{width: '50%'}}>
                        <Chart options={chartsData.PieChart2.options} series={chartsData.PieChart2.series} type="pie" width="100%" height={320} />
                        </div>
                    </div>
                    <div className={styles.sectionTitle}>Przydzielane zadania</div>
                    <div className={styles.chartContainer}>
                        <div style={{width: '75%'}}>
                        <Chart options={chartsData.BarChart1.options} series={chartsData.BarChart1.series} type="line" width="100%" height={320} />
                        </div>
                        <div className={styles.descriptionContainer}>
                            <div className={styles.value}>+22%</div>
                            <div className={styles.description}>Ilość przydzielonych zadańn: 11 (7)</div>
                        </div>
                    </div>
                    <div className={styles.sectionTitle}>Rozpoczęcie pracy nad zadaniami</div>
                    <div className={styles.chartContainer}>
                        <div className={styles.descriptionContainer}>
                            <div className={styles.value}>+22%</div>
                            <div className={styles.description}>Średni czas rozpoczęcia pracy: 2dni (1.3 dnia) </div>
                        </div>
                        <div style={{width: '75%'}}>
                        <Chart options={chartsData.BarChart2.options} series={chartsData.BarChart2.series} type="line" width="100%" height={320} />
                        </div>
                    </div>
                    <div className={styles.sectionTitle}>Zakończenie pracy nad zadaniami</div>
                    <div className={styles.chartContainer}>
                        <div style={{width: '75%'}}>
                        <Chart options={chartsData.BarChart3.options} series={chartsData.BarChart3.series} type="line" width="100%" height={320} />
                        </div>
                        <div className={styles.descriptionContainer}>
                            <div className={styles.value}>+22%</div>
                            <div className={styles.description}>Średni czas pracy: 2dni (1.3 dnia)</div>
                        </div>
                    </div>
                </div>}
            </>}</>
        )
}
export default Stats