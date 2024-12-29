<script setup></script>
<template>
  <form action="" method="POST" class="form">
    <div class="header-container">
      <img class="header-image" src="../assets/img/logo-header.png" alt="" />

      <p class="header-description">
        <span
          ><svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            class="bi bi-quote"
            viewBox="0 0 16 16"
          >
            <path
              d="M12 12a1 1 0 0 0 1-1V8.558a1 1 0 0 0-1-1h-1.388q0-.527.062-1.054.093-.558.31-.992t.559-.683q.34-.279.868-.279V3q-.868 0-1.52.372a3.3 3.3 0 0 0-1.085.992 4.9 4.9 0 0 0-.62 1.458A7.7 7.7 0 0 0 9 7.558V11a1 1 0 0 0 1 1zm-6 0a1 1 0 0 0 1-1V8.558a1 1 0 0 0-1-1H4.612q0-.527.062-1.054.094-.558.31-.992.217-.434.559-.683.34-.279.868-.279V3q-.868 0-1.52.372a3.3 3.3 0 0 0-1.085.992 4.9 4.9 0 0 0-.62 1.458A7.7 7.7 0 0 0 3 7.558V11a1 1 0 0 0 1 1z"
            />
          </svg>
        </span>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat
        dignissimos repellat beatae, cum culpa eos eligendi expedita sunt
        nostrum, facere quam quidem, perspiciatis vitae labore ipsam adipisci ea
        modi quibusdam. Error, porro, eaque labore harum libero ut facilis
        aspernatur accusamus fugit beatae officia voluptas consequatur commodi
        eius id veritatis in!
      </p>
      <div class="wrap-container">
        <div class="wrap-content">
          <p class="sosmed">Gisaweb</p>
          <p class="sosmed">gisaweb24@gmail.com</p>
        </div>
        <div class="wrap-content-right">
          <p class="sosmed">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-arrow-left"
              viewBox="0 0 16 16"
            >
              <path
                fill-rule="evenodd"
                d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8"
              />
            </svg>
          </p>
          <p class="sosmed">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-arrow-right"
              viewBox="0 0 16 16"
            >
              <path
                fill-rule="evenodd"
                d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8"
              />
            </svg>
          </p>
        </div>
      </div>
    </div>
    <div class="container-form">
      <div class="title-form">
        <h2>Welcome Back</h2>
        <p>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Hic unde
          consequuntur sint.
        </p>
      </div>
      <div class="input-group">
        <label for="">Email</label> <input type="email" name="email" />
      </div>
      <div class="input-group">
        <label for="">Password</label> <input type="password" name="password" />
      </div>
      <button class="button" type="submit">Masuk</button>
    </div>
  </form>
</template>
<style lang="css" scoped>
@import "../assets/css/formLogin.css";
</style>
