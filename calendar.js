async function fetchCal(url) {
    return await fetch(url).then(r => r.text()).then(ICAL.parse)
}

function extractVEvent(jCal) {
    return (new ICAL.Component(jCal)).getFirstSubcomponent('vevent')
}

function upcomingMeetings(vevent) {
    const expand = new ICAL.RecurExpansion({
        component: vevent,
        dtstart: vevent.getFirstPropertyValue('dtstart')
    })

    const today = new Date()
    let next = expand.next().toJSDate()
    while (next.getTime() < today.getTime()) {
        next = expand.next().toJSDate()
    }

    return [next, expand.next().toJSDate(), expand.next().toJSDate()]
}

function populateTemplate(dates) {
    const template = document.getElementById('upcoming-meeting')

    const target = document.getElementById('upcoming-meetings').querySelector('tbody')

    const formatter = new Intl.DateTimeFormat('en-GB', {
        dateStyle: 'full',
        timeStyle: 'short',
        timeZone: 'Europe/London',
    })

    dates.forEach(d => {
        const templateContent = template.content.cloneNode(true)
        let time = templateContent.querySelector('time')
        time.setAttribute('datetime', d.toISOString())
        time.textContent = formatter.format(d)
        target.appendChild(templateContent)
    })
}

Promise.resolve(fetchCal('/meetings.ics')
    .then(extractVEvent)
    .then(upcomingMeetings)
    .then(populateTemplate))

// const event = new ICAL.Event(vevent)
// console.log(event.summary)
