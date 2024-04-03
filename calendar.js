function $(sel, elem = document) { return elem.querySelector(sel) }
function $$(sel, elem = document) { return elem.querySelectorAll(sel) }

function extractVEvent(jCal) {
    return (new ICAL.Component(jCal)).getFirstSubcomponent('vevent')
}

function upcomingMeetings(vevent) {
    const re = new ICAL.RecurExpansion({
        component: vevent,
        dtstart: vevent.getFirstPropertyValue('dtstart')
    })
    const getNext = () => re.next().toJSDate()
    const today = new Date()

    let next; do {
        next = getNext()
    } while (next.getTime() < today.getTime())

    return [next, getNext(), getNext()]
}

function populateTable(dates) {
    const template = $('#upcoming-meeting')
    const target = $('#upcoming-meetings tbody')

    const formatter = new Intl.DateTimeFormat('en-GB', {
        dateStyle: 'full', timeStyle: 'short', timeZone: 'Europe/London'
    })

    dates.forEach(d => {
        const templateContent = template.content.cloneNode(true)
        const time = $('time', templateContent)
        time.setAttribute('datetime', d.toISOString())
        time.textContent = formatter.format(d)
        target.appendChild(templateContent)
    })
}

fetch('/meetings.ics')
    .then(r => r.text())
    .then(ICAL.parse)
    .then(extractVEvent)
    .then(upcomingMeetings)
    .then(populateTable)
