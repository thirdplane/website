
(() => {
  const root = document.getElementById('tp-directions');
  if (!root) return;
  const detail = root.querySelector('#tp-detail');
  const images = {remix:'/assets/studio-directions/remix.jpg',holo:'/assets/studio-directions/holovibes.jpg',intent:'/assets/studio-directions/intent.jpg'};
  const notes = {
    remix:{title:'Generative Remix',meta:'Interface prototype / February 2026',question:'Can pointing at an artifact replace having to describe your taste?',built:'A WebGL workbench in which two AI agents extract shader parameters and generate the controls people use to remix an artifact.',learned:'The prototype demonstrates a control-generation workflow, with direct manipulation and natural-language adjustments. It is an exploration of an interaction model; the write-up does not establish broader user outcomes.',next:'Can the same approach help shape intent before an artifact exists? That question leads to Intent Configuration Interface.',path:'generative-remix',image:'remix'},
    holo:{title:'Holovibes',meta:'Creative coding / August 2026',question:'What changes when a flat image becomes a responsive material?',built:'A WebGL material playground for photos and SVG artwork, with controls for diffraction, sparkle, saturation, and foil tint. It builds on Dmitry Kurash’s Holocloth.',learned:'The write-up describes how vector geometry preserves composition while the renderer adds view-dependent glints, lighting, and relief.',next:'How far can the same graphic identity travel across different material treatments? The project also includes a cloth lab.',path:'holovibes',image:'holo'},
    intent:{title:'Intent Configuration Interface',meta:'Interface prototype / March 2026',question:'What if you could inspect and edit what the model thought you meant?',built:'A readable trait score between a language prompt and generated output, with editable preferences and a portable soul.md export.',learned:'The write-up reports a limited check of the “bold” control. The larger idea is making interpretation inspectable; broad effectiveness is not established.',next:'Could explicit human preferences inform automatic refinement of an agent’s skills?',path:'taste-score',image:'intent'},
    research:{title:'Steering an image model toward a quality: show not tell',meta:'Independent research pilot / June 2026 / One week / $25 compute',question:'Can a recognizable visual quality become a dependable control inside an image model?',built:'An activation-steering pilot using reference sets, content-matched comparisons, and a blind two-alternative forced-choice evaluation.',learned:'The author reports that the pilot did not establish a dependable taste control, and that AI judgments failed to align with human judgments in this setting.',next:'How do we check whether an AI evaluation system is measuring the quality people actually care about?',path:'model-internals-research'}
  };
  let opener;
  root.querySelectorAll('[data-open]').forEach(button => button.addEventListener('click', (event) => {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    const note = notes[button.dataset.open]; opener=button;
    ['title','meta','question','built','learned','next'].forEach(key => {root.querySelector('#tp-detail-'+key).textContent=note[key];});
    const img=root.querySelector('#tp-detail-image'); img.hidden=!note.image;
    if(note.image){img.src=images[note.image];img.alt=note.title+' — existing project screenshot';}else{img.removeAttribute('src');img.alt='';}
    root.querySelector('#tp-detail-source').href='/works/'+note.path+'/';
    detail.hidden=false; root.querySelector('#tp-close-detail').focus();
    detail.scrollIntoView({behavior:'instant',block:'start'});
  }));
  root.querySelector('#tp-close-detail').addEventListener('click',()=>{detail.hidden=true;if(opener)opener.focus();});
  root.querySelectorAll('[data-halo]').forEach(input=>input.addEventListener('input',()=>{
    const stage=root.querySelector('.tp-halo-stage');
    const hue=root.querySelector('[data-halo="hue"]').value;
    const softness=root.querySelector('[data-halo="softness"]').value;
    stage.style.setProperty('--tp-halo-color','hsl('+hue+' 80% 72%)');
    stage.style.setProperty('--tp-halo-blur',softness+'px');
  }));
})();
