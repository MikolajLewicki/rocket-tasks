import React, {useState, useEffect} from 'react'
import styles from './Stats.module.scss'
import { motion } from 'framer-motion'
import { ScaleAndOpacity, ScaleAndOpacity2, UpAndOpacity } from '../../animations/animations'
import statsStore from '../../zustand/statsStore'
import Chart from 'react-apexcharts'
const Stats = () => {
    const status = statsStore(state => state.status)
    const chartsContent = statsStore(state => state.chartsContent)
    
    const initialState = {
      PieChart1: {
        options: {
          labels: ["Nowe zadania", "W trakcie pracy", "Zakończone"],
          dataLabels: {
              formatter: (val, opts) => opts.w.config.series[opts.seriesIndex]
          },
          colors: ['#C1BDDB', '#D7C4F2', '#DABCE8', '#C4CAF2', '#BCCDE8'],
      },
      series: status === "showing tasks" ? [chartsContent.pieChart1.new.length, chartsContent.pieChart1.work.length, chartsContent.pieChart1.end.length] : [],
      },
      PieChart2: {
        options: {
          labels: ["Nowe zadania", "W trakcie pracy", "Zakończone"],
          dataLabels: {
              formatter: (val, opts) => opts.w.config.series[opts.seriesIndex]
          },
          colors: ['#C1BDDB', '#D7C4F2', '#DABCE8', '#C4CAF2', '#BCCDE8'],
      },
      series: status === "showing tasks" ? [chartsContent.pieChart2.new.length, chartsContent.pieChart2.work.length, chartsContent.pieChart2.end.length] : [],
      },
      BarChart1: {
        series: [{
          name: '1 Zakres Dat',
          type: 'column',
          data: status === "showing tasks" ? chartsContent.barChart1.chartData.map(item => item.range1) : []
        }, {
          name: '2 Zakres Dat',
          type: 'line',
          data: status === "showing tasks" ? chartsContent.barChart1.chartData.map(item => item.range2) : []
        }],
        options: {
        colors: ['#C1BDDB', '#BCCDE8', '#DABCE8', '#C4CAF2', '#D7C4F2'],
          stroke: {
            width: [0, 4]
          },
          dataLabels: {
            enabled: true,
          },
          labels: status === "showing tasks" ? chartsContent.barChart1.chartData.map(item => item.date) : [],
          xaxis: {
            type: 'datetime'
          }
        },
      },
      BarChart2: {
        series: [{
          name: '1 Zakres Dat',
          type: 'column',
          data: status === "showing tasks" ? chartsContent.barChart2.chartData.map(item => item.range1) : []
        }, {
          name: '2 Zakres Dat',
          type: 'line',
          data: status === "showing tasks" ? chartsContent.barChart2.chartData.map(item => item.range2) : []
        }],
        options: {
        colors: ['#C1BDDB', '#BCCDE8', '#DABCE8', '#C4CAF2', '#D7C4F2'],
          stroke: {
            width: [0, 4]
          },
          dataLabels: {
            enabled: true,
          },
          labels: status === "showing tasks" ? chartsContent.barChart2.chartData.map(item => item.date) : [],
          xaxis: {
            type: 'datetime'
          }
        },
      },
      BarChart3: {
        series: [{
          name: '1 Zakres Dat',
          type: 'column',
          data: status === "showing tasks" ? chartsContent.barChart3.chartData.map(item => item.range1) : []
        }, {
          name: '2 Zakres Dat',
          type: 'line',
          data: status === "showing tasks" ? chartsContent.barChart3.chartData.map(item => item.range2) : []
        }],
        options: {
        colors: ['#C1BDDB', '#BCCDE8', '#DABCE8', '#C4CAF2', '#D7C4F2'],
          stroke: {
            width: [0, 4]
          },
          dataLabels: {
            enabled: true,
          },
          labels: status === "showing tasks" ? chartsContent.barChart3.chartData.map(item => item.date) : [],
          xaxis: {
            type: 'datetime'
          }
        },
      }
    }
    const initialState2 = {
      BarChart1: {
        range1Length: status === "showing tasks" ? chartsContent.barChart1.data.range1Length : "",
        range2Length: status === "showing tasks" ? chartsContent.barChart1.data.range2Length : "",
        difference: status === "showing tasks" ? chartsContent.barChart1.data.difference : "",
      },
      BarChart2: {
        range1Ang: status === "showing tasks" ? chartsContent.barChart2.data.range1Ang : "",
        range2Avg: status === "showing tasks" ? chartsContent.barChart2.data.range2Avg : "",
        difference: status === "showing tasks" ? chartsContent.barChart2.data.difference : "",
      },
      BarChart3: {
        range1Ang: status === "showing tasks" ? chartsContent.barChart3.data.range1Ang : "",
        range2Avg: status === "showing tasks" ? chartsContent.barChart3.data.range2Avg : "",
        difference: status === "showing tasks" ? chartsContent.barChart3.data.difference : "",
      },
    }
    const [chartsData, setChartsData] = useState(initialState)
    const [descriptionData, setDescriptionData] = useState(initialState2)
    
    useEffect(() => {
      setChartsData(initialState)
      setDescriptionData(initialState2)
    }, [chartsContent])
    return(
        <>{status === "no filters" ? 
            <motion.div variants={ScaleAndOpacity2} initial="initial" animate="animate"  className={styles.noMatchingResults}>
                <h2>Porównaj swoje wyniki!</h2>
                <p>Dostosuj filtry aby wyświetlić odpowiednie Statystyki</p>
            </motion.div> : 
            <> {status === "no tasks" ? 
                <motion.div variants={ScaleAndOpacity} initial="initial" animate="animate"  className={styles.noMatchingResults}>
                    <h1>Ooops!</h1>
                    <h2>Brak pasujących zadań</h2>
                    <p>Dostosuj filtry aby znaleźć inne wyniki</p>
                </motion.div> 
                : 
                <div className={styles.wrapper}>
                    <div className={styles.title}> Statystyki z okresu </div>
                    <motion.div variants={UpAndOpacity} initial="initial" animate="animate">
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
                              <div className={styles.value}>{descriptionData.BarChart1.difference}%</div>
                              <div className={styles.description}>
                                Ilość przydzielonych zadańn: {descriptionData.BarChart1.range1Length} ({descriptionData.BarChart1.range2Length})
                              </div>
                          </div>
                      </div>
                      <div className={styles.sectionTitle}>Rozpoczęcie pracy nad zadaniami</div>
                      <div className={styles.chartContainer}>
                          <div className={styles.descriptionContainer}>
                              <div className={styles.value}>{descriptionData.BarChart2.difference}%</div>
                              <div className={styles.description}>
                                Średni czas rozpoczęcia pracy: {descriptionData.BarChart2.range1Ang}h ({descriptionData.BarChart2.range2Avg}h) 
                              </div>
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
                              <div className={styles.value}>{descriptionData.BarChart3.difference}%</div>
                              <div className={styles.description}>
                                Średni czas pracy: {descriptionData.BarChart3.range1Ang}h ({descriptionData.BarChart3.range2Avg}h)
                              </div>
                          </div>
                      </div>
                </motion.div>
              </div>}
            </>}
          </>
        )
}
export default Stats