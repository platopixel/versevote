const VerseList = async function () {
    // Get Genesis 1 from the BSB translation
    const response = await fetch(`https://bible.helloao.org/api/BSB/Genesis/1.json`);
    const data = await response.json();
    console.log(data);

    return (
        <div>
            <h1>Verse List</h1>
            <p>{data.chapter.content[1].content[0]}</p>
        </div>
    );
}

export default VerseList;