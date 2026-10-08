---
layout: default
title: Secure Archive
description: HEAVENLY IRREGULARITY MONITORING — Classified Archive
---

<!-- =====================================================
     BOOT SEQUENCE
     ===================================================== -->

<section id="boot-sequence" aria-label="System initialization">

  <div class="terminal-line" data-text="> HIM BIOS v1.5.1 — COPYRIGHT (C) 1990"></div>
  <div class="terminal-line" data-text="> HEAVENLY IRREGULARITY MONITORING"></div>
  <div class="terminal-line" data-text="> RESEARCH DIVISION — NODE HIM-1510"></div>
  <div class="terminal-line" data-text="> MEMORY CHECK ........ 65536 KB OK"></div>
  <div class="terminal-line" data-text="> CPU: HIM-X8 @ 433 MHz"></div>
  <div class="terminal-line" data-text="> DETECTING PERIPHERALS ... OK"></div>
  <div class="terminal-line" data-text="> MOUNTING /dev/archive0 . OK"></div>
  <div class="terminal-line" data-text="> ESTABLISHING UPLINK .... OK"></div>
  <div class="terminal-line" data-text="> AUTHENTICATION REQUIRED."></div>

</section>

<!-- =====================================================
     ARCHIVE INTERFACE (hidden until boot completes)
     ===================================================== -->

<section id="archive-interface" class="hidden" aria-label="Classified archive">

  <div class="institute-heading">
    <div class="classified-label">CLASSIFIED ARCHIVE — RESTRICTED ACCESS</div>
    <h1>HEAVENLY IRREGULARITY<br>MONITORING</h1>
    <div class="division-name">
      RESEARCH DIVISION
      <span>// EST. 1990 //</span>
    </div>
  </div>

  <!-- Warning box -->
  <section class="warning-box">
    <div class="warning-symbol">&#9888;</div>
    <div class="warning-content">
      <div class="warning-title">SYSTEM WARNING</div>
      <p>This terminal contains classified research belonging to the Research Division.</p>
      <p>Unauthorized access attempts will be logged and traced.</p>
      <p>All records are protected under HIM Protocol 666.</p>
    </div>
  </section>

  <!-- System status -->
  {% include system-status.html %}

  <!-- Frequency log -->
  <h2 class="section-title">FREQUENCY LOG</h2>

  <div class="freq-log">
    <div class="freq-log__title">ACTIVE MONITORING — SECTOR 7</div>

    <div class="freq-row">
      <span class="freq-row__freq">14.332 MHz</span>
      <span class="freq-row__status freq-row__status--ok">STABLE</span>
    </div>
    <div class="freq-row">
      <span class="freq-row__freq">27.891 MHz</span>
      <span class="freq-row__status freq-row__status--warn">FLUCTUATING</span>
    </div>
    <div class="freq-row">
      <span class="freq-row__freq">108.44 MHz</span>
      <span class="freq-row__status freq-row__status--err">ANOMALY</span>
    </div>
    <div class="freq-row">
      <span class="freq-row__freq">433.92 MHz</span>
      <span class="freq-row__status freq-row__status--ok">STABLE</span>
    </div>
    <div class="freq-row">
      <span class="freq-row__freq">902.11 MHz</span>
      <span class="freq-row__status freq-row__status--warn">FLUCTUATING</span>
    </div>

    <div class="freq-log__footer">LAST SWEEP: 04:22:18 UTC</div>
  </div>

  <!-- Active projects -->
  <h2 class="section-title">ACTIVE INVESTIGATIONS</h2>

  <ul class="project-list">
    <a href="#password-gate-1" class="project-item" onclick="document.getElementById('password-gate-1').scrollIntoView({behavior:'smooth'}); return false;">
      <div class="project-item__id">HIM-0042</div>
      <div class="project-item__title">Subject 1510 — Morning Star</div>
      <div class="project-item__desc">Anatomical study and containment of a celestial entity — Sector 7</div>
      <div class="project-item__status project-item__status--classified">CLASSIFIED</div>
    </a>
    <a href="{{ '/archive' | relative_url }}" class="project-item">
      <div class="project-item__id">HIM-0031</div>
      <div class="project-item__title">Archive Retrieval System</div>
      <div class="project-item__desc">Historical document indexing and cross-referencing</div>
      <div class="project-item__status project-item__status--active">ACTIVE</div>
    </a>
    <a href="{{ '/archive' | relative_url }}" class="project-item">
      <div class="project-item__id">HIM-0028</div>
      <div class="project-item__title">Energy Anomaly Detection</div>
      <div class="project-item__desc">Tracking corrupted golden energy signatures — ongoing</div>
      <div class="project-item__status project-item__status--suspended">SUSPENDED</div>
    </a>
    <a href="{{ '/archive' | relative_url }}" class="project-item">
      <div class="project-item__id">HIM-0019</div>
      <div class="project-item__title">Predecessor Archive Recovery</div>
      <div class="project-item__desc">Decoding pre-company records of the four earlier descents</div>
      <div class="project-item__status project-item__status--archived">ARCHIVED</div>
    </a>
  </ul>

  <!-- Subject record -->
  <h2 class="section-title">SUBJECT RECORD</h2>

  <article class="archive-record">
    <header class="record-header">
      <span>ARCHIVE RECORD</span>
      <span>SUBJECT 1510</span>
      <span>ID: HIM-1510</span>
    </header>
    <div class="record-body">
      <div class="record-line">
        <span>DESIGNATION</span>
        <strong>SUBJECT 1510</strong>
      </div>
      <div class="record-line">
        <span>COMMON NAME</span>
        <strong class="classified">THE MORNING STAR</strong>
      </div>
      <div class="record-line">
        <span>ARCHIVE STATUS</span>
        <strong class="classified">CLASSIFIED</strong>
      </div>
      <div class="record-line">
        <span>DATE</span>
        <strong>15 / 10</strong>
      </div>
      <div class="record-line">
        <span>LOCATION</span>
        <strong>UNKNOWN</strong>
      </div>
      <div class="record-line">
        <span>ORIGIN</span>
        <strong>UNKNOWN</strong>
      </div>
      <div class="record-line">
        <span>INVESTIGATION</span>
        <strong>ACTIVE</strong>
      </div>
    </div>
    <footer class="record-footer">
      <span>RECORD 001</span>
      <span>STATUS: PARTIALLY RECOVERED</span>
    </footer>
  </article>

  <!-- Password gate 1 -->
  <div class="password-gate" id="password-gate-1">
    <div class="password-gate__label">TERMINAL ACCESS — ENTER CREDENTIALS</div>
    <p class="password-gate__hint">
      Authentication required to access classified records.
      Enter the name given to the entity that descended during the fifth extinction.
    </p>
    <input type="text" class="password-gate__input" placeholder="ENTER KEY..." autocomplete="off">
    <br>
    <button class="password-gate__btn" data-redirect="{{ '/files/morning-star' | relative_url }}">Authenticate</button>
    <div class="password-gate__msg"></div>
  </div>

  <!-- Navigation -->
  <nav class="him-nav">
    <a href="{{ '/' | relative_url }}" class="active">Home</a>
    <a href="{{ '/archive' | relative_url }}">Archive</a>
    <a href="{{ '/files/morning-star' | relative_url }}">Files</a>
  </nav>

  <!-- Terminal prompt -->
  <div class="terminal-prompt">
    <span class="prompt-symbol">&gt;</span>
    <span>AWAITING AUTHENTICATION</span>
    <span class="cursor">&#9608;</span>
  </div>

</section>
