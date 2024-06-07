import {Batch} from "@/types";

export const batchData: Batch[] = [
    {
        batchNumber: 21,
        batchTime: '2022-01-01 12:00:00',
        orders: [
            {
                srcToken: {
                    image: 'https://statics.solscan.io/cdn/imgs/s60?ref=68747470733a2f2f7261772e67697468756275736572636f6e74656e742e636f6d2f736f6c616e612d6c6162732f746f6b656e2d6c6973742f6d61696e2f6173736574732f6d61696e6e65742f45506a465764643541756671535371654d32714e31787a7962617043384734774547476b5a777954447431762f6c6f676f2e706e67',
                    name: 'USDC',
                    amount: '100',
                },
                targetToken: {
                    image: 'https://statics.solscan.io/cdn/imgs/s60?ref=68747470733a2f2f6261666b726569626b33636f7673356c7479717861323732756f646863756c6272366b656136626574696466777933616a73617632766a7a79756d2e697066732e6e667473746f726167652e6c696e6b',
                    name: 'WIF',
                    amount: '400',
                }
            },
            {
                srcToken: {
                    image: 'https://statics.solscan.io/cdn/imgs/s60?ref=68747470733a2f2f6261666b726569626b33636f7673356c7479717861323732756f646863756c6272366b656136626574696466777933616a73617632766a7a79756d2e697066732e6e667473746f726167652e6c696e6b',
                    name: 'WIF',
                    amount: '400',
                },
                targetToken: {
                    image: 'https://statics.solscan.io/cdn/imgs/s60?ref=68747470733a2f2f7261772e67697468756275736572636f6e74656e742e636f6d2f736f6c616e612d6c6162732f746f6b656e2d6c6973742f6d61696e2f6173736574732f6d61696e6e65742f45506a465764643541756671535371654d32714e31787a7962617043384734774547476b5a777954447431762f6c6f676f2e706e67',
                    name: 'USDC',
                    amount: '100',
                }
            }
        ],
        solutions: [
            {
                agentName: 'Scully',
                agentImage: 'https://statics.solscan.io/cdn/imgs/s60?ref=68747470733a2f2f676174657761792e697279732e78797a2f45537865704c707676536e3930674d716f4b2d4869346535557636442d58746348576256734e576a4e304d',
                route: [
                    {
                        venueName: 'Jupiter',
                        venueImage: 'https://statics.solscan.io/ex-img/JUP4Fb2cqiRUcaTHdrPC8h2gNsA2ETXiPDD33WcGuJB.svg'
                    },
                    {
                        venueName: 'Meteora',
                        venueImage: 'https://statics.solscan.io/ex-img/Eo7WjKq67rjJQSZxS6z3YkapzY3eMj6Xy8X5EQVn5UaB.svg'
                    },
                    {
                        venueName: 'Phoenix',
                        venueImage: 'https://statics.solscan.io/ex-img/PhoeNiXZ8ByJGLkxNfZRnkUfjvmuYqLR89jjFHGqdXY.svg'
                    },
                ],
                solutionScore: 95
            },
            {
                agentName: 'Mulder',
                agentImage: 'https://statics.solscan.io/cdn/imgs/s60?ref=68747470733a2f2f63662d697066732e636f6d2f697066732f516d634d50316f35767045523156646d67593248756947444b63793151445a78774d7079736e436868455937746b',
                route: [
                    {
                        venueName: 'Meteora',
                        venueImage: 'https://statics.solscan.io/ex-img/Eo7WjKq67rjJQSZxS6z3YkapzY3eMj6Xy8X5EQVn5UaB.svg'
                    },
                    {
                        venueName: 'Raydium',
                        venueImage: 'https://statics.solscan.io/ex-img/CAMMCzo5YL8w4VFF8KVHrK22GGUsp5VTaW7grrKgrWqK.png'
                    }
                ],
                solutionScore: 90
            }
        ]
    },
    {
        batchNumber: 22,
        batchTime: '2024-02-01 12:00:00',
        orders: [
            {
                srcToken: {
                    image: 'https://statics.solscan.io/cdn/imgs/s60?ref=68747470733a2f2f7261772e67697468756275736572636f6e74656e742e636f6d2f736f6c616e612d6c6162732f746f6b656e2d6c6973742f6d61696e2f6173736574732f6d61696e6e65742f45506a465764643541756671535371654d32714e31787a7962617043384734774547476b5a777954447431762f6c6f676f2e706e67',
                    name: 'USDT',
                    amount: '300',
                },
                targetToken: {
                    image: 'https://statics.solscan.io/cdn/imgs/s60?ref=68747470733a2f2f6261666b726569626b33636f7673356c7479717861323732756f646863756c6272366b656136626574696466777933616a73617632766a7a79756d2e697066732e6e667473746f726167652e6c696e6b',
                    name: 'WIF',
                    amount: '800',
                }
            },
            {
                srcToken: {
                    image: 'https://statics.solscan.io/cdn/imgs/s60?ref=68747470733a2f2f6261666b726569626b33636f7673356c7479717861323732756f646863756c6272366b656136626574696466777933616a73617632766a7a79756d2e697066732e6e667473746f726167652e6c696e6b',
                    name: 'WIF',
                    amount: '800',
                },
                targetToken: {
                    image: 'https://statics.solscan.io/cdn/imgs/s60?ref=68747470733a2f2f7261772e67697468756275736572636f6e74656e742e636f6d2f736f6c616e612d6c6162732f746f6b656e2d6c6973742f6d61696e2f6173736574732f6d61696e6e65742f45506a465764643541756671535371654d32714e31787a7962617043384734774547476b5a777954447431762f6c6f676f2e706e67',
                    name: 'USDT',
                    amount: '300',
                }
            },
            {
                srcToken: {
                    image: 'https://statics.solscan.io/cdn/imgs/s60?ref=68747470733a2f2f6261666b726569626b33636f7673356c7479717861323732756f646863756c6272366b656136626574696466777933616a73617632766a7a79756d2e697066732e6e667473746f726167652e6c696e6b',
                    name: 'WIF',
                    amount: '500',
                },
                targetToken: {
                    image: 'https://statics.solscan.io/cdn/imgs/s60?ref=68747470733a2f2f7261772e67697468756275736572636f6e74656e742e636f6d2f736f6c616e612d6c6162732f746f6b656e2d6c6973742f6d61696e2f6173736574732f6d61696e6e65742f45506a465764643541756671535371654d32714e31787a7962617043384734774547476b5a777954447431762f6c6f676f2e706e67',
                    name: 'USDT',
                    amount: '1200',
                }
            },
            {
                srcToken: {
                    image: 'https://statics.solscan.io/cdn/imgs/s60?ref=68747470733a2f2f7261772e67697468756275736572636f6e74656e742e636f6d2f736f6c616e612d6c6162732f746f6b656e2d6c6973742f6d61696e2f6173736574732f6d61696e6e65742f45506a465764643541756671535371654d32714e31787a7962617043384734774547476b5a777954447431762f6c6f676f2e706e67',
                    name: 'USDT',
                    amount: '1000',
                },
                targetToken: {
                    image: 'https://statics.solscan.io/cdn/imgs/s60?ref=68747470733a2f2f6261666b726569626b33636f7673356c7479717861323732756f646863756c6272366b656136626574696466777933616a73617632766a7a79756d2e697066732e6e667473746f726167652e6c696e6b',
                    name: 'WIF',
                    amount: '1500',
                }
            },
        ],
        solutions: [
            {
                agentName: 'Arbitrium',
                agentImage: 'https://statics.solscan.io/cdn/imgs/s60?ref=68747470733a2f2f676174657761792e697279732e78797a2f45537865704c707676536e3930674d716f4b2d4869346535557636442d58746348576256734e576a4e304d',
                route: [
                    {
                        venueName: 'Jupiter',
                        venueImage: 'https://statics.solscan.io/ex-img/JUP4Fb2cqiRUcaTHdrPC8h2gNsA2ETXiPDD33WcGuJB.svg'
                    },
                    {
                        venueName: 'Meteora',
                        venueImage: 'https://statics.solscan.io/ex-img/Eo7WjKq67rjJQSZxS6z3YkapzY3eMj6Xy8X5EQVn5UaB.svg'
                    },
                    {
                        venueName: 'Phoenix',
                        venueImage: 'https://statics.solscan.io/ex-img/PhoeNiXZ8ByJGLkxNfZRnkUfjvmuYqLR89jjFHGqdXY.svg'
                    },
                ],
                solutionScore: 77
            },
            {
                agentName: 'Aptos',
                agentImage: 'https://statics.solscan.io/cdn/imgs/s60?ref=68747470733a2f2f63662d697066732e636f6d2f697066732f516d634d50316f35767045523156646d67593248756947444b63793151445a78774d7079736e436868455937746b',
                route: [
                    {
                        venueName: 'Meteora',
                        venueImage: 'https://statics.solscan.io/ex-img/Eo7WjKq67rjJQSZxS6z3YkapzY3eMj6Xy8X5EQVn5UaB.svg'
                    },
                    {
                        venueName: 'Raydium',
                        venueImage: 'https://statics.solscan.io/ex-img/CAMMCzo5YL8w4VFF8KVHrK22GGUsp5VTaW7grrKgrWqK.png'
                    }
                ],
                solutionScore: 50
            },
            {
                agentName: 'Aptos 2.0',
                agentImage: 'https://statics.solscan.io/cdn/imgs/s60?ref=68747470733a2f2f63662d697066732e636f6d2f697066732f516d634d50316f35767045523156646d67593248756947444b63793151445a78774d7079736e436868455937746b',
                route: [
                    {
                        venueName: 'Meteora 222',
                        venueImage: 'https://statics.solscan.io/ex-img/Eo7WjKq67rjJQSZxS6z3YkapzY3eMj6Xy8X5EQVn5UaB.svg'
                    },
                    {
                        venueName: 'Raydium 3333',
                        venueImage: 'https://statics.solscan.io/ex-img/CAMMCzo5YL8w4VFF8KVHrK22GGUsp5VTaW7grrKgrWqK.png'
                    }
                ],
                solutionScore: 20
            }
        ]
    },
    {
        batchNumber: 23,
        batchTime: '2024-02-02 12:00:00',
        orders: [
            {
                srcToken: {
                    image: 'https://statics.solscan.io/cdn/imgs/s60?ref=68747470733a2f2f7261772e67697468756275736572636f6e74656e742e636f6d2f736f6c616e612d6c6162732f746f6b656e2d6c6973742f6d61696e2f6173736574732f6d61696e6e65742f45506a465764643541756671535371654d32714e31787a7962617043384734774547476b5a777954447431762f6c6f676f2e706e67',
                    name: 'USDT',
                    amount: '1800',
                },
                targetToken: {
                    image: 'https://statics.solscan.io/cdn/imgs/s60?ref=68747470733a2f2f6261666b726569626b33636f7673356c7479717861323732756f646863756c6272366b656136626574696466777933616a73617632766a7a79756d2e697066732e6e667473746f726167652e6c696e6b',
                    name: 'WIF',
                    amount: '2800',
                }
            },
            {
                srcToken: {
                    image: 'https://statics.solscan.io/cdn/imgs/s60?ref=68747470733a2f2f6261666b726569626b33636f7673356c7479717861323732756f646863756c6272366b656136626574696466777933616a73617632766a7a79756d2e697066732e6e667473746f726167652e6c696e6b',
                    name: 'WIF',
                    amount: '2800',
                },
                targetToken: {
                    image: 'https://statics.solscan.io/cdn/imgs/s60?ref=68747470733a2f2f7261772e67697468756275736572636f6e74656e742e636f6d2f736f6c616e612d6c6162732f746f6b656e2d6c6973742f6d61696e2f6173736574732f6d61696e6e65742f45506a465764643541756671535371654d32714e31787a7962617043384734774547476b5a777954447431762f6c6f676f2e706e67',
                    name: 'USDT',
                    amount: '1800',
                }
            },
            {
                srcToken: {
                    image: 'https://statics.solscan.io/cdn/imgs/s60?ref=68747470733a2f2f7261772e67697468756275736572636f6e74656e742e636f6d2f736f6c616e612d6c6162732f746f6b656e2d6c6973742f6d61696e2f6173736574732f6d61696e6e65742f45506a465764643541756671535371654d32714e31787a7962617043384734774547476b5a777954447431762f6c6f676f2e706e67',
                    name: 'USDC',
                    amount: '1000',
                },
                targetToken: {
                    image: 'https://statics.solscan.io/cdn/imgs/s60?ref=68747470733a2f2f6261666b726569626b33636f7673356c7479717861323732756f646863756c6272366b656136626574696466777933616a73617632766a7a79756d2e697066732e6e667473746f726167652e6c696e6b',
                    name: 'ARB',
                    amount: '900',
                }
            },
        ],
        solutions: [
            {
                agentName: 'Arbitrium 333',
                agentImage: 'https://statics.solscan.io/cdn/imgs/s60?ref=68747470733a2f2f676174657761792e697279732e78797a2f45537865704c707676536e3930674d716f4b2d4869346535557636442d58746348576256734e576a4e304d',
                route: [
                    {
                        venueName: 'Jupiter',
                        venueImage: 'https://statics.solscan.io/ex-img/JUP4Fb2cqiRUcaTHdrPC8h2gNsA2ETXiPDD33WcGuJB.svg'
                    },
                    {
                        venueName: 'Meteora',
                        venueImage: 'https://statics.solscan.io/ex-img/Eo7WjKq67rjJQSZxS6z3YkapzY3eMj6Xy8X5EQVn5UaB.svg'
                    },
                    {
                        venueName: 'Phoenix',
                        venueImage: 'https://statics.solscan.io/ex-img/PhoeNiXZ8ByJGLkxNfZRnkUfjvmuYqLR89jjFHGqdXY.svg'
                    },
                ],
                solutionScore: 99
            },
            {
                agentName: 'Aptos rrr',
                agentImage: 'https://statics.solscan.io/cdn/imgs/s60?ref=68747470733a2f2f63662d697066732e636f6d2f697066732f516d634d50316f35767045523156646d67593248756947444b63793151445a78774d7079736e436868455937746b',
                route: [
                    {
                        venueName: 'Meteora',
                        venueImage: 'https://statics.solscan.io/ex-img/Eo7WjKq67rjJQSZxS6z3YkapzY3eMj6Xy8X5EQVn5UaB.svg'
                    },
                    {
                        venueName: 'Raydium',
                        venueImage: 'https://statics.solscan.io/ex-img/CAMMCzo5YL8w4VFF8KVHrK22GGUsp5VTaW7grrKgrWqK.png'
                    }
                ],
                solutionScore: 17
            }
        ]
    },
    {
        batchNumber: 24,
        batchTime: '2022-01-01 12:00:00',
        orders: [
            {
                srcToken: {
                    image: 'https://statics.solscan.io/cdn/imgs/s60?ref=68747470733a2f2f7261772e67697468756275736572636f6e74656e742e636f6d2f736f6c616e612d6c6162732f746f6b656e2d6c6973742f6d61696e2f6173736574732f6d61696e6e65742f45506a465764643541756671535371654d32714e31787a7962617043384734774547476b5a777954447431762f6c6f676f2e706e67',
                    name: 'USDC',
                    amount: '100',
                },
                targetToken: {
                    image: 'https://statics.solscan.io/cdn/imgs/s60?ref=68747470733a2f2f6261666b726569626b33636f7673356c7479717861323732756f646863756c6272366b656136626574696466777933616a73617632766a7a79756d2e697066732e6e667473746f726167652e6c696e6b',
                    name: 'WIF',
                    amount: '400',
                }
            },
            {
                srcToken: {
                    image: 'https://statics.solscan.io/cdn/imgs/s60?ref=68747470733a2f2f6261666b726569626b33636f7673356c7479717861323732756f646863756c6272366b656136626574696466777933616a73617632766a7a79756d2e697066732e6e667473746f726167652e6c696e6b',
                    name: 'WIF',
                    amount: '400',
                },
                targetToken: {
                    image: 'https://statics.solscan.io/cdn/imgs/s60?ref=68747470733a2f2f7261772e67697468756275736572636f6e74656e742e636f6d2f736f6c616e612d6c6162732f746f6b656e2d6c6973742f6d61696e2f6173736574732f6d61696e6e65742f45506a465764643541756671535371654d32714e31787a7962617043384734774547476b5a777954447431762f6c6f676f2e706e67',
                    name: 'USDC',
                    amount: '100',
                }
            }
        ],
        solutions: [
            {
                agentName: 'Scully',
                agentImage: 'https://statics.solscan.io/cdn/imgs/s60?ref=68747470733a2f2f676174657761792e697279732e78797a2f45537865704c707676536e3930674d716f4b2d4869346535557636442d58746348576256734e576a4e304d',
                route: [
                    {
                        venueName: 'Jupiter',
                        venueImage: 'https://statics.solscan.io/ex-img/JUP4Fb2cqiRUcaTHdrPC8h2gNsA2ETXiPDD33WcGuJB.svg'
                    },
                    {
                        venueName: 'Meteora',
                        venueImage: 'https://statics.solscan.io/ex-img/Eo7WjKq67rjJQSZxS6z3YkapzY3eMj6Xy8X5EQVn5UaB.svg'
                    },
                    {
                        venueName: 'Phoenix',
                        venueImage: 'https://statics.solscan.io/ex-img/PhoeNiXZ8ByJGLkxNfZRnkUfjvmuYqLR89jjFHGqdXY.svg'
                    },
                ],
                solutionScore: 95
            },
            {
                agentName: 'Mulder',
                agentImage: 'https://statics.solscan.io/cdn/imgs/s60?ref=68747470733a2f2f63662d697066732e636f6d2f697066732f516d634d50316f35767045523156646d67593248756947444b63793151445a78774d7079736e436868455937746b',
                route: [
                    {
                        venueName: 'Meteora',
                        venueImage: 'https://statics.solscan.io/ex-img/Eo7WjKq67rjJQSZxS6z3YkapzY3eMj6Xy8X5EQVn5UaB.svg'
                    },
                    {
                        venueName: 'Raydium',
                        venueImage: 'https://statics.solscan.io/ex-img/CAMMCzo5YL8w4VFF8KVHrK22GGUsp5VTaW7grrKgrWqK.png'
                    }
                ],
                solutionScore: 90
            }
        ]
    },
    {
        batchNumber: 25,
        batchTime: '2024-02-01 12:00:00',
        orders: [
            {
                srcToken: {
                    image: 'https://statics.solscan.io/cdn/imgs/s60?ref=68747470733a2f2f7261772e67697468756275736572636f6e74656e742e636f6d2f736f6c616e612d6c6162732f746f6b656e2d6c6973742f6d61696e2f6173736574732f6d61696e6e65742f45506a465764643541756671535371654d32714e31787a7962617043384734774547476b5a777954447431762f6c6f676f2e706e67',
                    name: 'USDT',
                    amount: '300',
                },
                targetToken: {
                    image: 'https://statics.solscan.io/cdn/imgs/s60?ref=68747470733a2f2f6261666b726569626b33636f7673356c7479717861323732756f646863756c6272366b656136626574696466777933616a73617632766a7a79756d2e697066732e6e667473746f726167652e6c696e6b',
                    name: 'WIF',
                    amount: '800',
                }
            },
            {
                srcToken: {
                    image: 'https://statics.solscan.io/cdn/imgs/s60?ref=68747470733a2f2f6261666b726569626b33636f7673356c7479717861323732756f646863756c6272366b656136626574696466777933616a73617632766a7a79756d2e697066732e6e667473746f726167652e6c696e6b',
                    name: 'WIF',
                    amount: '800',
                },
                targetToken: {
                    image: 'https://statics.solscan.io/cdn/imgs/s60?ref=68747470733a2f2f7261772e67697468756275736572636f6e74656e742e636f6d2f736f6c616e612d6c6162732f746f6b656e2d6c6973742f6d61696e2f6173736574732f6d61696e6e65742f45506a465764643541756671535371654d32714e31787a7962617043384734774547476b5a777954447431762f6c6f676f2e706e67',
                    name: 'USDT',
                    amount: '300',
                }
            },
            {
                srcToken: {
                    image: 'https://statics.solscan.io/cdn/imgs/s60?ref=68747470733a2f2f6261666b726569626b33636f7673356c7479717861323732756f646863756c6272366b656136626574696466777933616a73617632766a7a79756d2e697066732e6e667473746f726167652e6c696e6b',
                    name: 'WIF',
                    amount: '500',
                },
                targetToken: {
                    image: 'https://statics.solscan.io/cdn/imgs/s60?ref=68747470733a2f2f7261772e67697468756275736572636f6e74656e742e636f6d2f736f6c616e612d6c6162732f746f6b656e2d6c6973742f6d61696e2f6173736574732f6d61696e6e65742f45506a465764643541756671535371654d32714e31787a7962617043384734774547476b5a777954447431762f6c6f676f2e706e67',
                    name: 'USDT',
                    amount: '1200',
                }
            },
            {
                srcToken: {
                    image: 'https://statics.solscan.io/cdn/imgs/s60?ref=68747470733a2f2f7261772e67697468756275736572636f6e74656e742e636f6d2f736f6c616e612d6c6162732f746f6b656e2d6c6973742f6d61696e2f6173736574732f6d61696e6e65742f45506a465764643541756671535371654d32714e31787a7962617043384734774547476b5a777954447431762f6c6f676f2e706e67',
                    name: 'USDT',
                    amount: '1000',
                },
                targetToken: {
                    image: 'https://statics.solscan.io/cdn/imgs/s60?ref=68747470733a2f2f6261666b726569626b33636f7673356c7479717861323732756f646863756c6272366b656136626574696466777933616a73617632766a7a79756d2e697066732e6e667473746f726167652e6c696e6b',
                    name: 'WIF',
                    amount: '1500',
                }
            },
        ],
        solutions: [
            {
                agentName: 'Arbitrium',
                agentImage: 'https://statics.solscan.io/cdn/imgs/s60?ref=68747470733a2f2f676174657761792e697279732e78797a2f45537865704c707676536e3930674d716f4b2d4869346535557636442d58746348576256734e576a4e304d',
                route: [
                    {
                        venueName: 'Jupiter',
                        venueImage: 'https://statics.solscan.io/ex-img/JUP4Fb2cqiRUcaTHdrPC8h2gNsA2ETXiPDD33WcGuJB.svg'
                    },
                    {
                        venueName: 'Meteora',
                        venueImage: 'https://statics.solscan.io/ex-img/Eo7WjKq67rjJQSZxS6z3YkapzY3eMj6Xy8X5EQVn5UaB.svg'
                    },
                    {
                        venueName: 'Phoenix',
                        venueImage: 'https://statics.solscan.io/ex-img/PhoeNiXZ8ByJGLkxNfZRnkUfjvmuYqLR89jjFHGqdXY.svg'
                    },
                ],
                solutionScore: 77
            },
            {
                agentName: 'Aptos',
                agentImage: 'https://statics.solscan.io/cdn/imgs/s60?ref=68747470733a2f2f63662d697066732e636f6d2f697066732f516d634d50316f35767045523156646d67593248756947444b63793151445a78774d7079736e436868455937746b',
                route: [
                    {
                        venueName: 'Meteora',
                        venueImage: 'https://statics.solscan.io/ex-img/Eo7WjKq67rjJQSZxS6z3YkapzY3eMj6Xy8X5EQVn5UaB.svg'
                    },
                    {
                        venueName: 'Raydium',
                        venueImage: 'https://statics.solscan.io/ex-img/CAMMCzo5YL8w4VFF8KVHrK22GGUsp5VTaW7grrKgrWqK.png'
                    }
                ],
                solutionScore: 50
            },
            {
                agentName: 'Aptos 2.0',
                agentImage: 'https://statics.solscan.io/cdn/imgs/s60?ref=68747470733a2f2f63662d697066732e636f6d2f697066732f516d634d50316f35767045523156646d67593248756947444b63793151445a78774d7079736e436868455937746b',
                route: [
                    {
                        venueName: 'Meteora 222',
                        venueImage: 'https://statics.solscan.io/ex-img/Eo7WjKq67rjJQSZxS6z3YkapzY3eMj6Xy8X5EQVn5UaB.svg'
                    },
                    {
                        venueName: 'Raydium 3333',
                        venueImage: 'https://statics.solscan.io/ex-img/CAMMCzo5YL8w4VFF8KVHrK22GGUsp5VTaW7grrKgrWqK.png'
                    }
                ],
                solutionScore: 20
            }
        ]
    },
    {
        batchNumber: 26,
        batchTime: '2024-02-02 12:00:00',
        orders: [
            {
                srcToken: {
                    image: 'https://statics.solscan.io/cdn/imgs/s60?ref=68747470733a2f2f7261772e67697468756275736572636f6e74656e742e636f6d2f736f6c616e612d6c6162732f746f6b656e2d6c6973742f6d61696e2f6173736574732f6d61696e6e65742f45506a465764643541756671535371654d32714e31787a7962617043384734774547476b5a777954447431762f6c6f676f2e706e67',
                    name: 'USDT',
                    amount: '1800',
                },
                targetToken: {
                    image: 'https://statics.solscan.io/cdn/imgs/s60?ref=68747470733a2f2f6261666b726569626b33636f7673356c7479717861323732756f646863756c6272366b656136626574696466777933616a73617632766a7a79756d2e697066732e6e667473746f726167652e6c696e6b',
                    name: 'WIF',
                    amount: '2800',
                }
            },
            {
                srcToken: {
                    image: 'https://statics.solscan.io/cdn/imgs/s60?ref=68747470733a2f2f6261666b726569626b33636f7673356c7479717861323732756f646863756c6272366b656136626574696466777933616a73617632766a7a79756d2e697066732e6e667473746f726167652e6c696e6b',
                    name: 'WIF',
                    amount: '2800',
                },
                targetToken: {
                    image: 'https://statics.solscan.io/cdn/imgs/s60?ref=68747470733a2f2f7261772e67697468756275736572636f6e74656e742e636f6d2f736f6c616e612d6c6162732f746f6b656e2d6c6973742f6d61696e2f6173736574732f6d61696e6e65742f45506a465764643541756671535371654d32714e31787a7962617043384734774547476b5a777954447431762f6c6f676f2e706e67',
                    name: 'USDT',
                    amount: '1800',
                }
            },
            {
                srcToken: {
                    image: 'https://statics.solscan.io/cdn/imgs/s60?ref=68747470733a2f2f7261772e67697468756275736572636f6e74656e742e636f6d2f736f6c616e612d6c6162732f746f6b656e2d6c6973742f6d61696e2f6173736574732f6d61696e6e65742f45506a465764643541756671535371654d32714e31787a7962617043384734774547476b5a777954447431762f6c6f676f2e706e67',
                    name: 'USDC',
                    amount: '1000',
                },
                targetToken: {
                    image: 'https://statics.solscan.io/cdn/imgs/s60?ref=68747470733a2f2f6261666b726569626b33636f7673356c7479717861323732756f646863756c6272366b656136626574696466777933616a73617632766a7a79756d2e697066732e6e667473746f726167652e6c696e6b',
                    name: 'ARB',
                    amount: '900',
                }
            },
        ],
        solutions: [
            {
                agentName: 'Arbitrium 333',
                agentImage: 'https://statics.solscan.io/cdn/imgs/s60?ref=68747470733a2f2f676174657761792e697279732e78797a2f45537865704c707676536e3930674d716f4b2d4869346535557636442d58746348576256734e576a4e304d',
                route: [
                    {
                        venueName: 'Jupiter',
                        venueImage: 'https://statics.solscan.io/ex-img/JUP4Fb2cqiRUcaTHdrPC8h2gNsA2ETXiPDD33WcGuJB.svg'
                    },
                    {
                        venueName: 'Meteora',
                        venueImage: 'https://statics.solscan.io/ex-img/Eo7WjKq67rjJQSZxS6z3YkapzY3eMj6Xy8X5EQVn5UaB.svg'
                    },
                    {
                        venueName: 'Phoenix',
                        venueImage: 'https://statics.solscan.io/ex-img/PhoeNiXZ8ByJGLkxNfZRnkUfjvmuYqLR89jjFHGqdXY.svg'
                    },
                ],
                solutionScore: 99
            },
            {
                agentName: 'Aptos rrr',
                agentImage: 'https://statics.solscan.io/cdn/imgs/s60?ref=68747470733a2f2f63662d697066732e636f6d2f697066732f516d634d50316f35767045523156646d67593248756947444b63793151445a78774d7079736e436868455937746b',
                route: [
                    {
                        venueName: 'Meteora',
                        venueImage: 'https://statics.solscan.io/ex-img/Eo7WjKq67rjJQSZxS6z3YkapzY3eMj6Xy8X5EQVn5UaB.svg'
                    },
                    {
                        venueName: 'Raydium',
                        venueImage: 'https://statics.solscan.io/ex-img/CAMMCzo5YL8w4VFF8KVHrK22GGUsp5VTaW7grrKgrWqK.png'
                    }
                ],
                solutionScore: 17
            }
        ]
    },
    {
        batchNumber: 27,
        batchTime: '2022-01-01 12:00:00',
        orders: [
            {
                srcToken: {
                    image: 'https://statics.solscan.io/cdn/imgs/s60?ref=68747470733a2f2f7261772e67697468756275736572636f6e74656e742e636f6d2f736f6c616e612d6c6162732f746f6b656e2d6c6973742f6d61696e2f6173736574732f6d61696e6e65742f45506a465764643541756671535371654d32714e31787a7962617043384734774547476b5a777954447431762f6c6f676f2e706e67',
                    name: 'USDC',
                    amount: '100',
                },
                targetToken: {
                    image: 'https://statics.solscan.io/cdn/imgs/s60?ref=68747470733a2f2f6261666b726569626b33636f7673356c7479717861323732756f646863756c6272366b656136626574696466777933616a73617632766a7a79756d2e697066732e6e667473746f726167652e6c696e6b',
                    name: 'WIF',
                    amount: '400',
                }
            },
            {
                srcToken: {
                    image: 'https://statics.solscan.io/cdn/imgs/s60?ref=68747470733a2f2f6261666b726569626b33636f7673356c7479717861323732756f646863756c6272366b656136626574696466777933616a73617632766a7a79756d2e697066732e6e667473746f726167652e6c696e6b',
                    name: 'WIF',
                    amount: '400',
                },
                targetToken: {
                    image: 'https://statics.solscan.io/cdn/imgs/s60?ref=68747470733a2f2f7261772e67697468756275736572636f6e74656e742e636f6d2f736f6c616e612d6c6162732f746f6b656e2d6c6973742f6d61696e2f6173736574732f6d61696e6e65742f45506a465764643541756671535371654d32714e31787a7962617043384734774547476b5a777954447431762f6c6f676f2e706e67',
                    name: 'USDC',
                    amount: '100',
                }
            }
        ],
        solutions: [
            {
                agentName: 'Scully',
                agentImage: 'https://statics.solscan.io/cdn/imgs/s60?ref=68747470733a2f2f676174657761792e697279732e78797a2f45537865704c707676536e3930674d716f4b2d4869346535557636442d58746348576256734e576a4e304d',
                route: [
                    {
                        venueName: 'Jupiter',
                        venueImage: 'https://statics.solscan.io/ex-img/JUP4Fb2cqiRUcaTHdrPC8h2gNsA2ETXiPDD33WcGuJB.svg'
                    },
                    {
                        venueName: 'Meteora',
                        venueImage: 'https://statics.solscan.io/ex-img/Eo7WjKq67rjJQSZxS6z3YkapzY3eMj6Xy8X5EQVn5UaB.svg'
                    },
                    {
                        venueName: 'Phoenix',
                        venueImage: 'https://statics.solscan.io/ex-img/PhoeNiXZ8ByJGLkxNfZRnkUfjvmuYqLR89jjFHGqdXY.svg'
                    },
                ],
                solutionScore: 95
            },
            {
                agentName: 'Mulder',
                agentImage: 'https://statics.solscan.io/cdn/imgs/s60?ref=68747470733a2f2f63662d697066732e636f6d2f697066732f516d634d50316f35767045523156646d67593248756947444b63793151445a78774d7079736e436868455937746b',
                route: [
                    {
                        venueName: 'Meteora',
                        venueImage: 'https://statics.solscan.io/ex-img/Eo7WjKq67rjJQSZxS6z3YkapzY3eMj6Xy8X5EQVn5UaB.svg'
                    },
                    {
                        venueName: 'Raydium',
                        venueImage: 'https://statics.solscan.io/ex-img/CAMMCzo5YL8w4VFF8KVHrK22GGUsp5VTaW7grrKgrWqK.png'
                    }
                ],
                solutionScore: 90
            }
        ]
    },
    {
        batchNumber: 28,
        batchTime: '2024-02-01 12:00:00',
        orders: [
            {
                srcToken: {
                    image: 'https://statics.solscan.io/cdn/imgs/s60?ref=68747470733a2f2f7261772e67697468756275736572636f6e74656e742e636f6d2f736f6c616e612d6c6162732f746f6b656e2d6c6973742f6d61696e2f6173736574732f6d61696e6e65742f45506a465764643541756671535371654d32714e31787a7962617043384734774547476b5a777954447431762f6c6f676f2e706e67',
                    name: 'USDT',
                    amount: '300',
                },
                targetToken: {
                    image: 'https://statics.solscan.io/cdn/imgs/s60?ref=68747470733a2f2f6261666b726569626b33636f7673356c7479717861323732756f646863756c6272366b656136626574696466777933616a73617632766a7a79756d2e697066732e6e667473746f726167652e6c696e6b',
                    name: 'WIF',
                    amount: '800',
                }
            },
            {
                srcToken: {
                    image: 'https://statics.solscan.io/cdn/imgs/s60?ref=68747470733a2f2f6261666b726569626b33636f7673356c7479717861323732756f646863756c6272366b656136626574696466777933616a73617632766a7a79756d2e697066732e6e667473746f726167652e6c696e6b',
                    name: 'WIF',
                    amount: '800',
                },
                targetToken: {
                    image: 'https://statics.solscan.io/cdn/imgs/s60?ref=68747470733a2f2f7261772e67697468756275736572636f6e74656e742e636f6d2f736f6c616e612d6c6162732f746f6b656e2d6c6973742f6d61696e2f6173736574732f6d61696e6e65742f45506a465764643541756671535371654d32714e31787a7962617043384734774547476b5a777954447431762f6c6f676f2e706e67',
                    name: 'USDT',
                    amount: '300',
                }
            },
            {
                srcToken: {
                    image: 'https://statics.solscan.io/cdn/imgs/s60?ref=68747470733a2f2f6261666b726569626b33636f7673356c7479717861323732756f646863756c6272366b656136626574696466777933616a73617632766a7a79756d2e697066732e6e667473746f726167652e6c696e6b',
                    name: 'WIF',
                    amount: '500',
                },
                targetToken: {
                    image: 'https://statics.solscan.io/cdn/imgs/s60?ref=68747470733a2f2f7261772e67697468756275736572636f6e74656e742e636f6d2f736f6c616e612d6c6162732f746f6b656e2d6c6973742f6d61696e2f6173736574732f6d61696e6e65742f45506a465764643541756671535371654d32714e31787a7962617043384734774547476b5a777954447431762f6c6f676f2e706e67',
                    name: 'USDT',
                    amount: '1200',
                }
            },
            {
                srcToken: {
                    image: 'https://statics.solscan.io/cdn/imgs/s60?ref=68747470733a2f2f7261772e67697468756275736572636f6e74656e742e636f6d2f736f6c616e612d6c6162732f746f6b656e2d6c6973742f6d61696e2f6173736574732f6d61696e6e65742f45506a465764643541756671535371654d32714e31787a7962617043384734774547476b5a777954447431762f6c6f676f2e706e67',
                    name: 'USDT',
                    amount: '1000',
                },
                targetToken: {
                    image: 'https://statics.solscan.io/cdn/imgs/s60?ref=68747470733a2f2f6261666b726569626b33636f7673356c7479717861323732756f646863756c6272366b656136626574696466777933616a73617632766a7a79756d2e697066732e6e667473746f726167652e6c696e6b',
                    name: 'WIF',
                    amount: '1500',
                }
            },
        ],
        solutions: [
            {
                agentName: 'Arbitrium',
                agentImage: 'https://statics.solscan.io/cdn/imgs/s60?ref=68747470733a2f2f676174657761792e697279732e78797a2f45537865704c707676536e3930674d716f4b2d4869346535557636442d58746348576256734e576a4e304d',
                route: [
                    {
                        venueName: 'Jupiter',
                        venueImage: 'https://statics.solscan.io/ex-img/JUP4Fb2cqiRUcaTHdrPC8h2gNsA2ETXiPDD33WcGuJB.svg'
                    },
                    {
                        venueName: 'Meteora',
                        venueImage: 'https://statics.solscan.io/ex-img/Eo7WjKq67rjJQSZxS6z3YkapzY3eMj6Xy8X5EQVn5UaB.svg'
                    },
                    {
                        venueName: 'Phoenix',
                        venueImage: 'https://statics.solscan.io/ex-img/PhoeNiXZ8ByJGLkxNfZRnkUfjvmuYqLR89jjFHGqdXY.svg'
                    },
                ],
                solutionScore: 77
            },
            {
                agentName: 'Aptos',
                agentImage: 'https://statics.solscan.io/cdn/imgs/s60?ref=68747470733a2f2f63662d697066732e636f6d2f697066732f516d634d50316f35767045523156646d67593248756947444b63793151445a78774d7079736e436868455937746b',
                route: [
                    {
                        venueName: 'Meteora',
                        venueImage: 'https://statics.solscan.io/ex-img/Eo7WjKq67rjJQSZxS6z3YkapzY3eMj6Xy8X5EQVn5UaB.svg'
                    },
                    {
                        venueName: 'Raydium',
                        venueImage: 'https://statics.solscan.io/ex-img/CAMMCzo5YL8w4VFF8KVHrK22GGUsp5VTaW7grrKgrWqK.png'
                    }
                ],
                solutionScore: 50
            },
            {
                agentName: 'Aptos 2.0',
                agentImage: 'https://statics.solscan.io/cdn/imgs/s60?ref=68747470733a2f2f63662d697066732e636f6d2f697066732f516d634d50316f35767045523156646d67593248756947444b63793151445a78774d7079736e436868455937746b',
                route: [
                    {
                        venueName: 'Meteora 222',
                        venueImage: 'https://statics.solscan.io/ex-img/Eo7WjKq67rjJQSZxS6z3YkapzY3eMj6Xy8X5EQVn5UaB.svg'
                    },
                    {
                        venueName: 'Raydium 3333',
                        venueImage: 'https://statics.solscan.io/ex-img/CAMMCzo5YL8w4VFF8KVHrK22GGUsp5VTaW7grrKgrWqK.png'
                    }
                ],
                solutionScore: 20
            }
        ]
    },
    {
        batchNumber: 29,
        batchTime: '2024-02-02 12:00:00',
        orders: [
            {
                srcToken: {
                    image: 'https://statics.solscan.io/cdn/imgs/s60?ref=68747470733a2f2f7261772e67697468756275736572636f6e74656e742e636f6d2f736f6c616e612d6c6162732f746f6b656e2d6c6973742f6d61696e2f6173736574732f6d61696e6e65742f45506a465764643541756671535371654d32714e31787a7962617043384734774547476b5a777954447431762f6c6f676f2e706e67',
                    name: 'USDT',
                    amount: '1800',
                },
                targetToken: {
                    image: 'https://statics.solscan.io/cdn/imgs/s60?ref=68747470733a2f2f6261666b726569626b33636f7673356c7479717861323732756f646863756c6272366b656136626574696466777933616a73617632766a7a79756d2e697066732e6e667473746f726167652e6c696e6b',
                    name: 'WIF',
                    amount: '2800',
                }
            },
            {
                srcToken: {
                    image: 'https://statics.solscan.io/cdn/imgs/s60?ref=68747470733a2f2f6261666b726569626b33636f7673356c7479717861323732756f646863756c6272366b656136626574696466777933616a73617632766a7a79756d2e697066732e6e667473746f726167652e6c696e6b',
                    name: 'WIF',
                    amount: '2800',
                },
                targetToken: {
                    image: 'https://statics.solscan.io/cdn/imgs/s60?ref=68747470733a2f2f7261772e67697468756275736572636f6e74656e742e636f6d2f736f6c616e612d6c6162732f746f6b656e2d6c6973742f6d61696e2f6173736574732f6d61696e6e65742f45506a465764643541756671535371654d32714e31787a7962617043384734774547476b5a777954447431762f6c6f676f2e706e67',
                    name: 'USDT',
                    amount: '1800',
                }
            },
            {
                srcToken: {
                    image: 'https://statics.solscan.io/cdn/imgs/s60?ref=68747470733a2f2f7261772e67697468756275736572636f6e74656e742e636f6d2f736f6c616e612d6c6162732f746f6b656e2d6c6973742f6d61696e2f6173736574732f6d61696e6e65742f45506a465764643541756671535371654d32714e31787a7962617043384734774547476b5a777954447431762f6c6f676f2e706e67',
                    name: 'USDC',
                    amount: '1000',
                },
                targetToken: {
                    image: 'https://statics.solscan.io/cdn/imgs/s60?ref=68747470733a2f2f6261666b726569626b33636f7673356c7479717861323732756f646863756c6272366b656136626574696466777933616a73617632766a7a79756d2e697066732e6e667473746f726167652e6c696e6b',
                    name: 'ARB',
                    amount: '900',
                }
            },
        ],
        solutions: [
            {
                agentName: 'Arbitrium 333',
                agentImage: 'https://statics.solscan.io/cdn/imgs/s60?ref=68747470733a2f2f676174657761792e697279732e78797a2f45537865704c707676536e3930674d716f4b2d4869346535557636442d58746348576256734e576a4e304d',
                route: [
                    {
                        venueName: 'Jupiter',
                        venueImage: 'https://statics.solscan.io/ex-img/JUP4Fb2cqiRUcaTHdrPC8h2gNsA2ETXiPDD33WcGuJB.svg'
                    },
                    {
                        venueName: 'Meteora',
                        venueImage: 'https://statics.solscan.io/ex-img/Eo7WjKq67rjJQSZxS6z3YkapzY3eMj6Xy8X5EQVn5UaB.svg'
                    },
                    {
                        venueName: 'Phoenix',
                        venueImage: 'https://statics.solscan.io/ex-img/PhoeNiXZ8ByJGLkxNfZRnkUfjvmuYqLR89jjFHGqdXY.svg'
                    },
                ],
                solutionScore: 99
            },
            {
                agentName: 'Aptos rrr',
                agentImage: 'https://statics.solscan.io/cdn/imgs/s60?ref=68747470733a2f2f63662d697066732e636f6d2f697066732f516d634d50316f35767045523156646d67593248756947444b63793151445a78774d7079736e436868455937746b',
                route: [
                    {
                        venueName: 'Meteora',
                        venueImage: 'https://statics.solscan.io/ex-img/Eo7WjKq67rjJQSZxS6z3YkapzY3eMj6Xy8X5EQVn5UaB.svg'
                    },
                    {
                        venueName: 'Raydium',
                        venueImage: 'https://statics.solscan.io/ex-img/CAMMCzo5YL8w4VFF8KVHrK22GGUsp5VTaW7grrKgrWqK.png'
                    }
                ],
                solutionScore: 17
            }
        ]
    }

];
