const daysMonthsData = {
    '01':'31',
    '02':'28',
    '03':'31',
    '04':'30',
    '05':'31',
    '06':'30',
    '07':'31',
    '08':'31',
    '09':'30',
    '10':'31',
    '11':'30',
    '12':'31'
}

const isValidDate = (date) => {
    const cleanDate = date.split('/')
    if (
        cleanDate[0] > 0 && cleanDate[0] <= 31 
        && cleanDate[1] > 0 && cleanDate[1] <= 12 
        && cleanDate[2] > 999 && cleanDate[2] <= 9999
    ) {
            return maxDaysInMonth(cleanDate[0], cleanDate[1])
    }
    else {
            return false
    }
}
// console.log(isValidDate("03/12/1005"))

const maxDaysInMonth = (days, month) => {
    return days <= daysMonthsData[month] ? true : false

}
// console.log(maxDaysInMonth('28','02'))


const isPalindrome = (date) => {
    const cleanDate = date.split('/').join('')
    const reversedDate = date.split('/').join('').split('').reverse().join('')
    return cleanDate === reversedDate
}
// console.log(isPalindrome("11/02/2011"))


// doit retourner les x prochains palindromes à compter de date
const getNextPalindrome = (date, x) => {
    const cleanDate = date.split('/')
    let days = String(cleanDate[0]).padStart(2, '0')
    let months = String(cleanDate[1]).padStart(2, '0')
    let years = parseInt(cleanDate[2])
    let daysInt = parseInt(days)
    let monthsInt = parseInt(months)
    const solution = [];

    while (years <= 9999) {
        while (monthsInt <= 12) {
            while (daysInt <= parseInt(daysMonthsData[months])) {
                if (solution.length === x) {
                    return solution
                } 
                const iteratedDate = `${days}/${months}/${years}`
                console.log(iteratedDate)
                isPalindrome(iteratedDate) ? solution.push(iteratedDate) : null
        
                daysInt++
                days = String(daysInt).padStart(2, '0')

            }
            monthsInt++
            months = String(monthsInt).padStart(2, '0')
            daysInt = 1
            days = '01'
        }
        years++
        monthsInt = 1
        months = '01'
    }

}
// console.log(getNextPalindrome("08/01/2011", 2))

// updateDate function without JS Date function
{
const updateDate = (date) => {
    const cleanDate = date.split('/')
    let updatedDate = [String((parseInt(cleanDate[0])) + 1).padStart(2, '0'), cleanDate[1], cleanDate[2]].join('/')
    if (isValidDate(updatedDate)) {
        return updatedDate
    }
    updatedDate = ['01', String((parseInt(cleanDate[1])) + 1).padStart(2, '0'), cleanDate[2]].join('/')
    if (isValidDate(updatedDate)) {
        return updatedDate
    }
    updatedDate = ['01', '01', String((parseInt(cleanDate[2])) + 1)].join('/')
    if (isValidDate(updatedDate)) {
        return updatedDate
    }
}
}

// incrementDate function with JS Date function
{
function incrementDate(dateString) {
    let [day, month, year] = dateString.split('/').map(Number);
    let date = new Date(year, month - 1, day);
    date.setDate(date.getDate() + 1);
    let newDay = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
    let newMonth = (date.getMonth() + 1) < 10 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1);
    let newYear = date.getFullYear();
    return `${newDay}/${newMonth}/${newYear}`;
}
}
// console.log(incrementDate("31/12/2011"))

const solution = []
const getNextPalindromeRecursive = (date, x, s) => {
    if (s.length === x) {
        return s
    }
    if (isPalindrome(date)) {
        s.push(date)
    }
    return getNextPalindromeRecursive(incrementDate(date), x, s)
}

console.log(getNextPalindromeRecursive("08/01/2011", 6, solution))